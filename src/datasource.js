import _ from "./lodash";
import moment from 'moment';
import SunCalc from "./suncalc";

export class SunAndMoonDatasource {

  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;

    // Datasource configuration
    this.position = instanceSettings.jsonData.position;

    // Configure available metrics
    var _p = this;
    this.metrics = {
      moon_illumination: {
        text: "Moon illumination",
        calc: function(time) {
                return SunCalc.getMoonIllumination(time).fraction;
              },
        values: []
      },
      moon_altitude: {
        text: "Moon altitude",
        calc: function(time) {
          return _p.cachedMoonPosition(time).altitude * 180 / Math.PI;
        },
        values: []
      },
      moon_azimuth: {
        text: "Moon azimuth",
        calc: function(time) {
          return _p.cachedMoonPosition(time).azimuth * 180 / Math.PI;
        },
        values: []
      },
      moon_distance: {
        text: "Moon distance",
        calc: function(time) { return _p.cachedMoonPosition(time).distance; },
        values: []
      },
      sun_altitude: {
        text: "Sun altitude",
        calc: function(time) {
          return _p.cachedSunPosition(time).altitude * 180 / Math.PI;
        },
        values: []
      },
      sun_azimuth: {
        text: "Sun azimuth",
        calc: function(time) {
          return _p.cachedSunPosition(time).azimuth * 180 / Math.PI;
        },
        values: []
      }
    };

    // Configure annotations
    this.annotations = {
      sunrise: {
        title: "Sunrise",
        text:  "Top edge of the sun appears on the horizon",
        tags:  "sun"
      },
      sunriseEnd: {
        title: "Sunrise ends",
        text:  "Bottom edge of the sun touches the horizon",
        tags:  "sun"
      },
      goldenHourEnd: {
        title: "Morning golden hour ends",
        text:  "Soft light, best time for photography",
        tags:  "sun"
      },
      solarNoon: {
        title: "Solar noon",
        text:  "Sun is in the highest position",
        tags:  "sun"
      },
      goldenHour: {
        title: "Evening golden hour starts",
        text:  "Soft light, best time for photography",
        tags:  "sun"
      },
      sunsetStart: {
        title: "Sunset starts",
        text:  "Bottom edge of the sun touches the horizon",
        tags:  "sun"
      },
      sunset: {
        title: "Sunset",
        text:  "Sun disappears below the horizon, " +
               "evening civil twilight starts",
        tags:  "sun"
      },
      dusk: {
        title: "Dusk",
        text:  "Evening nautical twilight starts",
        tags:  "sun"
      },
      nauticalDusk: {
        title: "Nautical dusk",
        text:  "Evening astronomical twilight starts",
        tags:  "sun"
      },
      night: {
        title: "Night starts",
        text:  "Dark enough for astronomical observations",
        tags:  "sun"
      },
      nadir: {
        title: "Nadir",
        text:  "Darkest moment of the night, sun is in the lowest position",
        tags:  "sun"
      },
      nightEnd: {
        title: "Night ends",
        text:  "Morning astronomical twilight starts",
        tags:  "sun"
      },
      nauticalDawn: {
        title: "Nautical dawn",
        text:  "Morning nautical twilight starts",
        tags:  "sun"
      },
      dawn: {
        title: "Dawn",
        text:  "Morning nautical twilight ends, morning civil twilight starts",
        tags:  "sun"
      },
      moonrise: {
        title: "Moonrise",
        text:  "Top edge of the moon appears on the horizon",
        tags:  "moon"
      },
      moonset: {
        title: "Moonset",
        text:  "Moon disappears below the horizon",
        tags:  "moon"
      }
    };
  }

  // Cache values
  cachedMoonPosition(time) {
    if (!this.moonPosition)
      this.moonPosition = SunCalc.getMoonPosition(
          time, this.position.latitude, this.position.longitude);
    return this.moonPosition;
  }
  cachedSunPosition(time) {
    if (!this.sunPosition)
      this.sunPosition = SunCalc.getPosition(
          time, this.position.latitude, this.position.longitude);
    return this.sunPosition;
  }
  cleanCachedPositions() {
    this.moonPosition = null;
    this.sunPosition = null;
  }

  query(options) {
    var from = options.range.from.valueOf();
    var to = options.range.to.valueOf();
    var maxDataPoints = options.maxDataPoints;
    var stepInSeconds = (to - from) / maxDataPoints;

    var targets = _.map(options.targets, function(i) { return i.target; });

    // Result map
    var series = _.pick(this.metrics, targets);
    for (let idx = 0, time = from; time < to;
         idx += 1, time += Math.ceil(stepInSeconds)) {
      for (let metric in series) {
        series[metric].values[idx] = [series[metric].calc(time), time];
      }
      this.cleanCachedPositions();
    }

    var targetSeries = [];
    for (let metric in series) {
      targetSeries.push({"target": series[metric].text,
                         "datapoints": series[metric].values});
    }
    return {"data": targetSeries};
  }

  annotationQuery(options) {
    var from = moment(options.range.from);
    var to = moment(options.range.to).add(1, "days");
    var targets = "*";
    if (options.annotation.query !== undefined)
      targets = options.annotation.query.split(/\s*[\s,]\s*/);

    var result = [];
    for (let date = from; date < to; date.add(1, "days")) {
      var sunTimes = SunCalc.getTimes(
          date, this.position.latitude, this.position.longitude);
      var moonTimes = SunCalc.getMoonTimes(
          date, this.position.latitude, this.position.longitude);
      var values = _.merge({}, sunTimes,
          _.mapKeys(moonTimes, function(value, key) { return "moon" + key; }));
      for (let value in values) {
        if (targets != "*" && targets.indexOf(value) < 0)
          continue;
        result.push({
          "annotation": options.annotation,
          "title": this.annotations[value].title,
          "text": this.annotations[value].text,
          "time": values[value].valueOf(),
          "tags": this.annotations[value].tags,
        });
      }
    }
    return this.q.when(result);
  }

  testDatasource() {
    var res = {};
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
    return this.q.when(res);
  }

  metricFindQuery() {
    return this.q.when(_.map(this.metrics, (value, key) => {
      return {text: value.text, value: key};
    }));
  }
}
