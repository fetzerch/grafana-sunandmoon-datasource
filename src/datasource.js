import _ from "lodash";
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
        calc: function (time) {
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
  }

  // Cache values
  cachedMoonPosition(time) {
    if (!this.moonPosition)
      this.moonPosition = SunCalc.getMoonPosition(
          time, this.position.latitude, this.position.longitude);
    return this.moonPosition
  }
  cachedSunPosition(time) {
    if (!this.sunPosition)
      this.sunPosition = SunCalc.getPosition(
          time, this.position.latitude, this.position.longitude);
    return this.sunPosition
  }
  cleanCachedPositions() {
    this.moonPosition = null
    this.sunPosition = null
  }

  query(options) {
    var from = options.range.from.valueOf();
    var to = options.range.to.valueOf();
    var maxDataPoints = options.maxDataPoints;
    var stepInSeconds = (to - from) / maxDataPoints;

    var targets = _.map(options.targets, function (i) { return i.target });

    // Result map
    var series = _.pick(this.metrics, targets);
    for (var idx = 0, time = from; time < to;
         idx += 1, time += Math.ceil(stepInSeconds)) {
      for (var metric in series) {
        series[metric].values[idx] = [series[metric].calc(time), time];
      }
      this.cleanCachedPositions();
    }

    var targetSeries = [];
    for (var metric in series) {
      targetSeries.push({'target': series[metric].text,
                         'datapoints': series[metric].values});
    }
    return {"data": targetSeries};
  }

  testDatasource() {
    var res = {};
    if (this.position.latitude < -90 || this.position.latitude > 90) {
      res = {"status": "error", title: "Error",
             message: "Latitude not in range -+90."}
    } else if (this.position.longitude < -360 ||
               this.position.longitude > 360) {
      res = {"status": "error", title: "Error",
             message: "Longitude not in range -+360."}
    } else {
      res = {"status": "success", title: "Success",
             message: "Datasource added successfully."}
    }
    return this.q.when(res);
  }

  metricFindQuery() {
    var targets = _.keys(this.metrics)
    return this.q.when(targets.map(function (i) { return {text: i}; }));
  }
}
