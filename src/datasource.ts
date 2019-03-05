import _ from "lodash";
import moment from "moment";
import * as SunCalc from "suncalc";

interface Position {
  latitude: number;
  longitude: number;
}

export class SunAndMoonDatasource {
  position: Position;
  metrics: any;
  annotations: any;
  private moonPosition: SunCalc.GetMoonPositionResult;
  private sunPosition: SunCalc.GetSunPositionResult;

  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {

    // Datasource configuration. Flatten jsonData.position.* originating from older settings.
    if ("position" in instanceSettings.jsonData) {
      instanceSettings.jsonData.latitude = instanceSettings.jsonData.position.latitude;
      instanceSettings.jsonData.longitude = instanceSettings.jsonData.position.longitude;
      delete instanceSettings.jsonData.position;
    }
    this.position = instanceSettings.jsonData;

    // Configure available metrics
    this.metrics = {
      moon_illumination: {
        text: "Moon illumination",
        calc: (time) => SunCalc.getMoonIllumination(time).fraction,
        values: []
      },
      moon_altitude: {
        text: "Moon altitude",
        calc: (time) => this.cachedMoonPosition(time).altitude * 180 / Math.PI,
        values: []
      },
      moon_azimuth: {
        text: "Moon azimuth",
        calc: (time) => this.cachedMoonPosition(time).azimuth * 180 / Math.PI,
        values: []
      },
      moon_distance: {
        text: "Moon distance",
        calc: (time) => this.cachedMoonPosition(time).distance,
        values: []
      },
      sun_altitude: {
        text: "Sun altitude",
        calc: (time) => this.cachedSunPosition(time).altitude * 180 / Math.PI,
        values: []
      },
      sun_azimuth: {
        text: "Sun azimuth",
        calc: (time) => this.cachedSunPosition(time).azimuth * 180 / Math.PI,
        values: []
      }
    };

    // Configure annotations
    this.annotations = {
      sunrise: {
        title: "Sunrise",
        text:  "Top edge of the sun appears on the horizon",
        tags:  ["sun"]
      },
      sunriseEnd: {
        title: "Sunrise ends",
        text:  "Bottom edge of the sun touches the horizon",
        tags:  ["sun"]
      },
      goldenHourEnd: {
        title: "Morning golden hour ends",
        text:  "Soft light, best time for photography",
        tags:  ["sun"]
      },
      solarNoon: {
        title: "Solar noon",
        text:  "Sun is in the highest position",
        tags:  ["sun"]
      },
      goldenHour: {
        title: "Evening golden hour starts",
        text:  "Soft light, best time for photography",
        tags:  ["sun"]
      },
      sunsetStart: {
        title: "Sunset starts",
        text:  "Bottom edge of the sun touches the horizon",
        tags:  ["sun"]
      },
      sunset: {
        title: "Sunset",
        text:  "Sun disappears below the horizon, " +
               "evening civil twilight starts",
        tags:  ["sun"]
      },
      dusk: {
        title: "Dusk",
        text:  "Evening nautical twilight starts",
        tags:  ["sun"]
      },
      nauticalDusk: {
        title: "Nautical dusk",
        text:  "Evening astronomical twilight starts",
        tags:  ["sun"]
      },
      night: {
        title: "Night starts",
        text:  "Dark enough for astronomical observations",
        tags:  ["sun"]
      },
      nadir: {
        title: "Nadir",
        text:  "Darkest moment of the night, sun is in the lowest position",
        tags:  ["sun"]
      },
      nightEnd: {
        title: "Night ends",
        text:  "Morning astronomical twilight starts",
        tags:  ["sun"]
      },
      nauticalDawn: {
        title: "Nautical dawn",
        text:  "Morning nautical twilight starts",
        tags:  ["sun"]
      },
      dawn: {
        title: "Dawn",
        text:  "Morning nautical twilight ends, morning civil twilight starts",
        tags:  ["sun"]
      },
      moonrise: {
        title: "Moonrise",
        text:  "Top edge of the moon appears on the horizon",
        tags:  ["moon"]
      },
      moonset: {
        title: "Moonset",
        text:  "Moon disappears below the horizon",
        tags:  ["moon"]
      },
      noon: {
        title: "Noon",
        text: "12 o'clock in the daytime",
        tags: ["time"]
      },
      midnight: {
        title: "Midnight",
        text: "12 o'clock in the night",
        tags: ["time"]
      },
    };
  }

  // Cache values
  cachedMoonPosition(time) {
    if (!this.moonPosition) {
      this.moonPosition = SunCalc.getMoonPosition(
          time, this.position.latitude, this.position.longitude);
    }
    return this.moonPosition;
  }
  cachedSunPosition(time) {
    if (!this.sunPosition) {
      this.sunPosition = SunCalc.getPosition(
          time, this.position.latitude, this.position.longitude);
    }
    return this.sunPosition;
  }
  cleanCachedPositions() {
    this.moonPosition = null;
    this.sunPosition = null;
  }

  query(options) {
    const from = options.range.from.valueOf();
    const to = options.range.to.valueOf();
    const maxDataPoints = options.maxDataPoints;
    const stepInSeconds = (to - from) / maxDataPoints;

    const targets = _.map(options.targets, (i) => i.target);

    // Result map
    const series = _.pick(this.metrics, targets);
    for (let idx = 0, time = from; time < to;
         idx += 1, time += Math.ceil(stepInSeconds)) {
      for (const metric in series) {
        series[metric].values[idx] = [series[metric].calc(time), time];
      }
      this.cleanCachedPositions();
    }

    const targetSeries: any[] = [];
    for (const metric in series) {
      targetSeries.push({"target": series[metric].text,
                         "datapoints": series[metric].values});
    }
    return {"data": targetSeries};
  }

  annotationQuery(options) {
    const from = moment(options.range.from);
    const to = moment(options.range.to).add(1, "days");
    let targets = "*";
    if (options.annotation.query !== undefined) {
      targets = options.annotation.query.split(/\s*[\s,]\s*/);
    }

    const result: any[] = [];
    for (const date = from; date < to; date.add(1, "days")) {
      const sunTimes = SunCalc.getTimes(
          date.toDate(), this.position.latitude, this.position.longitude);
      const moonTimes = SunCalc.getMoonTimes(
          date.toDate(), this.position.latitude, this.position.longitude);
      const values = _.merge({}, sunTimes,
          _.mapKeys(moonTimes, (value, key) => "moon" + key));
      const setHours = Date.prototype[options.dashboard.isTimezoneUtc() ? "setUTCHours" : "setHours"];
      values.noon = setHours.call(date.toDate(), 12, 0, 0);
      values.midnight = setHours.call(date.toDate(), 0, 0, 0);
      for (const value in values) {
        if (targets !== "*" && targets.indexOf(value) < 0) {
            continue;
        }
        result.push({
          "annotation": options.annotation,
          "title": this.annotations[value].title,
          "text": this.annotations[value].text,
          "time": values[value].valueOf(),
          "tags": this.annotations[value].tags,
        });
      }
    }
    return this.$q.when(result);
  }

  testDatasource() {
    let res = {};
    if (this.position.latitude < -90 || this.position.latitude > 90) {
      res = {"status": "error", title: "Error",
             message: "Latitude not in range -+90."};
    } else if (this.position.longitude < -360 ||
               this.position.longitude > 360) {
      res = {"status": "error", title: "Error",
             message: "Longitude not in range -+360."};
    } else {
      res = {"status": "success", title: "Success",
             message: "Datasource added successfully."};
    }
    return this.$q.when(res);
  }

  metricFindQuery() {
    return this.$q.when(_.map(this.metrics, (value, key) => {
      return {text: value.text, value: key};
    }));
  }
}
