"use strict";

System.register(["./lodash", "moment", "./suncalc"], function (_export, _context) {
  "use strict";

  var _, moment, SunCalc, SunAndMoonDatasource;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_suncalc) {
      SunCalc = _suncalc.default;
    }],
    execute: function () {
      _export("SunAndMoonDatasource", SunAndMoonDatasource =
      /*#__PURE__*/
      function () {
        function SunAndMoonDatasource(instanceSettings, $q, backendSrv, templateSrv) {
          _classCallCheck(this, SunAndMoonDatasource);

          this.type = instanceSettings.type;
          this.url = instanceSettings.url;
          this.name = instanceSettings.name;
          this.q = $q;
          this.backendSrv = backendSrv;
          this.templateSrv = templateSrv; // Datasource configuration. Flatten jsonData.position.* originating from older settings.

          if ('position' in instanceSettings.jsonData) {
            instanceSettings.jsonData.latitude = instanceSettings.jsonData.position.latitude;
            instanceSettings.jsonData.longitude = instanceSettings.jsonData.position.longitude;
            delete instanceSettings.jsonData.position;
          }

          this.position = instanceSettings.jsonData; // Configure available metrics

          var _p = this;

          this.metrics = {
            moon_illumination: {
              text: "Moon illumination",
              calc: function calc(time) {
                return SunCalc.getMoonIllumination(time).fraction;
              },
              values: []
            },
            moon_altitude: {
              text: "Moon altitude",
              calc: function calc(time) {
                return _p.cachedMoonPosition(time).altitude * 180 / Math.PI;
              },
              values: []
            },
            moon_azimuth: {
              text: "Moon azimuth",
              calc: function calc(time) {
                return _p.cachedMoonPosition(time).azimuth * 180 / Math.PI;
              },
              values: []
            },
            moon_distance: {
              text: "Moon distance",
              calc: function calc(time) {
                return _p.cachedMoonPosition(time).distance;
              },
              values: []
            },
            sun_altitude: {
              text: "Sun altitude",
              calc: function calc(time) {
                return _p.cachedSunPosition(time).altitude * 180 / Math.PI;
              },
              values: []
            },
            sun_azimuth: {
              text: "Sun azimuth",
              calc: function calc(time) {
                return _p.cachedSunPosition(time).azimuth * 180 / Math.PI;
              },
              values: []
            }
          }; // Configure annotations

          this.annotations = {
            sunrise: {
              title: "Sunrise",
              text: "Top edge of the sun appears on the horizon",
              tags: "sun"
            },
            sunriseEnd: {
              title: "Sunrise ends",
              text: "Bottom edge of the sun touches the horizon",
              tags: "sun"
            },
            goldenHourEnd: {
              title: "Morning golden hour ends",
              text: "Soft light, best time for photography",
              tags: "sun"
            },
            solarNoon: {
              title: "Solar noon",
              text: "Sun is in the highest position",
              tags: "sun"
            },
            goldenHour: {
              title: "Evening golden hour starts",
              text: "Soft light, best time for photography",
              tags: "sun"
            },
            sunsetStart: {
              title: "Sunset starts",
              text: "Bottom edge of the sun touches the horizon",
              tags: "sun"
            },
            sunset: {
              title: "Sunset",
              text: "Sun disappears below the horizon, " + "evening civil twilight starts",
              tags: "sun"
            },
            dusk: {
              title: "Dusk",
              text: "Evening nautical twilight starts",
              tags: "sun"
            },
            nauticalDusk: {
              title: "Nautical dusk",
              text: "Evening astronomical twilight starts",
              tags: "sun"
            },
            night: {
              title: "Night starts",
              text: "Dark enough for astronomical observations",
              tags: "sun"
            },
            nadir: {
              title: "Nadir",
              text: "Darkest moment of the night, sun is in the lowest position",
              tags: "sun"
            },
            nightEnd: {
              title: "Night ends",
              text: "Morning astronomical twilight starts",
              tags: "sun"
            },
            nauticalDawn: {
              title: "Nautical dawn",
              text: "Morning nautical twilight starts",
              tags: "sun"
            },
            dawn: {
              title: "Dawn",
              text: "Morning nautical twilight ends, morning civil twilight starts",
              tags: "sun"
            },
            moonrise: {
              title: "Moonrise",
              text: "Top edge of the moon appears on the horizon",
              tags: "moon"
            },
            moonset: {
              title: "Moonset",
              text: "Moon disappears below the horizon",
              tags: "moon"
            },
            noon: {
              title: "Noon",
              text: "12 o'clock in the daytime",
              tags: "time"
            },
            midnight: {
              title: "Midnight",
              text: "12 o'clock in the night",
              tags: "time"
            }
          };
        } // Cache values


        _createClass(SunAndMoonDatasource, [{
          key: "cachedMoonPosition",
          value: function cachedMoonPosition(time) {
            if (!this.moonPosition) this.moonPosition = SunCalc.getMoonPosition(time, this.position.latitude, this.position.longitude);
            return this.moonPosition;
          }
        }, {
          key: "cachedSunPosition",
          value: function cachedSunPosition(time) {
            if (!this.sunPosition) this.sunPosition = SunCalc.getPosition(time, this.position.latitude, this.position.longitude);
            return this.sunPosition;
          }
        }, {
          key: "cleanCachedPositions",
          value: function cleanCachedPositions() {
            this.moonPosition = null;
            this.sunPosition = null;
          }
        }, {
          key: "query",
          value: function query(options) {
            var from = options.range.from.valueOf();
            var to = options.range.to.valueOf();
            var maxDataPoints = options.maxDataPoints;
            var stepInSeconds = (to - from) / maxDataPoints;

            var targets = _.map(options.targets, function (i) {
              return i.target;
            }); // Result map


            var series = _.pick(this.metrics, targets);

            for (var idx = 0, time = from; time < to; idx += 1, time += Math.ceil(stepInSeconds)) {
              for (var metric in series) {
                series[metric].values[idx] = [series[metric].calc(time), time];
              }

              this.cleanCachedPositions();
            }

            var targetSeries = [];

            for (var _metric in series) {
              targetSeries.push({
                "target": series[_metric].text,
                "datapoints": series[_metric].values
              });
            }

            return {
              "data": targetSeries
            };
          }
        }, {
          key: "annotationQuery",
          value: function annotationQuery(options) {
            var from = moment(options.range.from);
            var to = moment(options.range.to).add(1, "days");
            var targets = "*";
            if (options.annotation.query !== undefined) targets = options.annotation.query.split(/\s*[\s,]\s*/);
            var result = [];

            for (var date = from; date < to; date.add(1, "days")) {
              var sunTimes = SunCalc.getTimes(date, this.position.latitude, this.position.longitude);
              var moonTimes = SunCalc.getMoonTimes(date, this.position.latitude, this.position.longitude);

              var values = _.merge({}, sunTimes, _.mapKeys(moonTimes, function (value, key) {
                return "moon" + key;
              }));

              var setHours = Date.prototype[options.dashboard.isTimezoneUtc() ? "setUTCHours" : "setHours"];
              values.noon = setHours.call(date.toDate(), 12, 0, 0);
              values.midnight = setHours.call(date.toDate(), 0, 0, 0);

              for (var value in values) {
                if (targets != "*" && targets.indexOf(value) < 0) continue;
                result.push({
                  "annotation": options.annotation,
                  "title": this.annotations[value].title,
                  "text": this.annotations[value].text,
                  "time": values[value].valueOf(),
                  "tags": this.annotations[value].tags
                });
              }
            }

            return this.q.when(result);
          }
        }, {
          key: "testDatasource",
          value: function testDatasource() {
            var res = {};

            if (this.position.latitude < -90 || this.position.latitude > 90) {
              res = {
                "status": "error",
                title: "Error",
                message: "Latitude not in range -+90."
              };
            } else if (this.position.longitude < -360 || this.position.longitude > 360) {
              res = {
                "status": "error",
                title: "Error",
                message: "Longitude not in range -+360."
              };
            } else {
              res = {
                "status": "success",
                title: "Success",
                message: "Datasource added successfully."
              };
            }

            return this.q.when(res);
          }
        }, {
          key: "metricFindQuery",
          value: function metricFindQuery() {
            return this.q.when(_.map(this.metrics, function (value, key) {
              return {
                text: value.text,
                value: key
              };
            }));
          }
        }]);

        return SunAndMoonDatasource;
      }());
    }
  };
});
//# sourceMappingURL=datasource.js.map
