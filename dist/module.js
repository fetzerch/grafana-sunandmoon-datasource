define(["lodash","moment","app/plugins/sdk"], function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__7__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var datasource_1 = __webpack_require__(1);
exports.Datasource = datasource_1.SunAndMoonDatasource;
var config_ctrl_1 = __webpack_require__(5);
exports.ConfigCtrl = config_ctrl_1.SunAndMoonConfigCtrl;
var query_ctrl_1 = __webpack_require__(6);
exports.QueryCtrl = query_ctrl_1.SunAndMoonDatasourceQueryCtrl;
var SunAndMoonQueryOptionsCtrl = /** @class */ (function () {
    function SunAndMoonQueryOptionsCtrl() {
    }
    SunAndMoonQueryOptionsCtrl.templateUrl = "partials/query.options.html";
    return SunAndMoonQueryOptionsCtrl;
}());
exports.QueryOptionsCtrl = SunAndMoonQueryOptionsCtrl;
var SunAndMoonAnnotationsQueryCtrl = /** @class */ (function () {
    function SunAndMoonAnnotationsQueryCtrl() {
    }
    SunAndMoonAnnotationsQueryCtrl.templateUrl = "partials/annotations.editor.html";
    return SunAndMoonAnnotationsQueryCtrl;
}());
exports.AnnotationsQueryCtrl = SunAndMoonAnnotationsQueryCtrl;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(__webpack_require__(2));
var moment_1 = __importDefault(__webpack_require__(3));
var SunCalc = __importStar(__webpack_require__(4));
var SunAndMoonDatasource = /** @class */ (function () {
    function SunAndMoonDatasource(instanceSettings, backendSrv, templateSrv, $q) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.$q = $q;
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
                calc: function (time) { return SunCalc.getMoonIllumination(time).fraction; },
                values: []
            },
            moon_altitude: {
                text: "Moon altitude",
                calc: function (time) { return _this.cachedMoonPosition(time).altitude * 180 / Math.PI; },
                values: []
            },
            moon_azimuth: {
                text: "Moon azimuth",
                calc: function (time) { return _this.cachedMoonPosition(time).azimuth * 180 / Math.PI; },
                values: []
            },
            moon_distance: {
                text: "Moon distance",
                calc: function (time) { return _this.cachedMoonPosition(time).distance; },
                values: []
            },
            sun_altitude: {
                text: "Sun altitude",
                calc: function (time) { return _this.cachedSunPosition(time).altitude * 180 / Math.PI; },
                values: []
            },
            sun_azimuth: {
                text: "Sun azimuth",
                calc: function (time) { return _this.cachedSunPosition(time).azimuth * 180 / Math.PI; },
                values: []
            }
        };
        // Configure annotations
        this.annotations = {
            sunrise: {
                title: "Sunrise",
                text: "Top edge of the sun appears on the horizon",
                tags: ["sun"]
            },
            sunriseEnd: {
                title: "Sunrise ends",
                text: "Bottom edge of the sun touches the horizon",
                tags: ["sun"]
            },
            goldenHourEnd: {
                title: "Morning golden hour ends",
                text: "Soft light, best time for photography",
                tags: ["sun"]
            },
            solarNoon: {
                title: "Solar noon",
                text: "Sun is in the highest position",
                tags: ["sun"]
            },
            goldenHour: {
                title: "Evening golden hour starts",
                text: "Soft light, best time for photography",
                tags: ["sun"]
            },
            sunsetStart: {
                title: "Sunset starts",
                text: "Bottom edge of the sun touches the horizon",
                tags: ["sun"]
            },
            sunset: {
                title: "Sunset",
                text: "Sun disappears below the horizon, " +
                    "evening civil twilight starts",
                tags: ["sun"]
            },
            dusk: {
                title: "Dusk",
                text: "Evening nautical twilight starts",
                tags: ["sun"]
            },
            nauticalDusk: {
                title: "Nautical dusk",
                text: "Evening astronomical twilight starts",
                tags: ["sun"]
            },
            night: {
                title: "Night starts",
                text: "Dark enough for astronomical observations",
                tags: ["sun"]
            },
            nadir: {
                title: "Nadir",
                text: "Darkest moment of the night, sun is in the lowest position",
                tags: ["sun"]
            },
            nightEnd: {
                title: "Night ends",
                text: "Morning astronomical twilight starts",
                tags: ["sun"]
            },
            nauticalDawn: {
                title: "Nautical dawn",
                text: "Morning nautical twilight starts",
                tags: ["sun"]
            },
            dawn: {
                title: "Dawn",
                text: "Morning nautical twilight ends, morning civil twilight starts",
                tags: ["sun"]
            },
            moonrise: {
                title: "Moonrise",
                text: "Top edge of the moon appears on the horizon",
                tags: ["moon"]
            },
            moonset: {
                title: "Moonset",
                text: "Moon disappears below the horizon",
                tags: ["moon"]
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
    SunAndMoonDatasource.prototype.cachedMoonPosition = function (time) {
        if (!this.moonPosition) {
            this.moonPosition = SunCalc.getMoonPosition(time, this.position.latitude, this.position.longitude);
        }
        return this.moonPosition;
    };
    SunAndMoonDatasource.prototype.cachedSunPosition = function (time) {
        if (!this.sunPosition) {
            this.sunPosition = SunCalc.getPosition(time, this.position.latitude, this.position.longitude);
        }
        return this.sunPosition;
    };
    SunAndMoonDatasource.prototype.cleanCachedPositions = function () {
        this.moonPosition = null;
        this.sunPosition = null;
    };
    SunAndMoonDatasource.prototype.query = function (options) {
        var from = options.range.from.valueOf();
        var to = options.range.to.valueOf();
        var maxDataPoints = options.maxDataPoints;
        var stepInSeconds = (to - from) / maxDataPoints;
        var targets = lodash_1.default.map(options.targets, function (i) { return i.target; });
        // Result map
        var series = lodash_1.default.pick(this.metrics, targets);
        for (var idx = 0, time = from; time < to; idx += 1, time += Math.ceil(stepInSeconds)) {
            for (var metric in series) {
                series[metric].values[idx] = [series[metric].calc(time), time];
            }
            this.cleanCachedPositions();
        }
        var targetSeries = [];
        for (var metric in series) {
            targetSeries.push({ "target": series[metric].text,
                "datapoints": series[metric].values });
        }
        return { "data": targetSeries };
    };
    SunAndMoonDatasource.prototype.annotationQuery = function (options) {
        var from = moment_1.default(options.range.from);
        var to = moment_1.default(options.range.to).add(1, "days");
        var targets = "*";
        if (options.annotation.query !== undefined) {
            targets = options.annotation.query.split(/\s*[\s,]\s*/);
        }
        var result = [];
        for (var date = from; date < to; date.add(1, "days")) {
            var sunTimes = SunCalc.getTimes(date.toDate(), this.position.latitude, this.position.longitude);
            var moonTimes = SunCalc.getMoonTimes(date.toDate(), this.position.latitude, this.position.longitude);
            var values = lodash_1.default.merge({}, sunTimes, lodash_1.default.mapKeys(moonTimes, function (value, key) { return "moon" + key; }));
            var setHours = Date.prototype[options.dashboard.isTimezoneUtc() ? "setUTCHours" : "setHours"];
            values.noon = setHours.call(date.toDate(), 12, 0, 0);
            values.midnight = setHours.call(date.toDate(), 0, 0, 0);
            for (var value in values) {
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
    };
    SunAndMoonDatasource.prototype.testDatasource = function () {
        var res = {};
        if (this.position.latitude < -90 || this.position.latitude > 90) {
            res = { "status": "error", title: "Error",
                message: "Latitude not in range -+90." };
        }
        else if (this.position.longitude < -360 ||
            this.position.longitude > 360) {
            res = { "status": "error", title: "Error",
                message: "Longitude not in range -+360." };
        }
        else {
            res = { "status": "success", title: "Success",
                message: "Datasource added successfully." };
        }
        return this.$q.when(res);
    };
    SunAndMoonDatasource.prototype.metricFindQuery = function () {
        return this.$q.when(lodash_1.default.map(this.metrics, function (value, key) {
            return { text: value.text, value: key };
        }));
    };
    return SunAndMoonDatasource;
}());
exports.SunAndMoonDatasource = SunAndMoonDatasource;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/

(function () { 'use strict';

// shortcuts for easier to read formulas

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos,
    tan  = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad  = PI / 180;

// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


// date/time constants and conversions

var dayMs = 1000 * 60 * 60 * 24,
    J1970 = 2440588,
    J2000 = 2451545;

function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
function toDays(date)   { return toJulian(date) - J2000; }


// general calculations for position

var e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

function astroRefraction(h) {
    if (h < 0) // the following formula works for positive altitudes only.
        h = 0; // if h = -0.08901179 a div/0 would occur.

    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

// general sun calculations

function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

function eclipticLongitude(M) {

    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}


var SunCalc = {};


// calculates sun position for a given date and latitude/longitude

SunCalc.getPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};


// sun times configuration (angle, morning name, evening name)

var times = SunCalc.times = [
    [-0.833, 'sunrise',       'sunset'      ],
    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
    [    -6, 'dawn',          'dusk'        ],
    [   -12, 'nauticalDawn',  'nauticalDusk'],
    [   -18, 'nightEnd',      'night'       ],
    [     6, 'goldenHourEnd', 'goldenHour'  ]
];

// adds a custom time to the times config

SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
};


// calculations for sun times

var J0 = 0.0009;

function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {

    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}


// calculates sun times for a given date and latitude/longitude

SunCalc.getTimes = function (date, lat, lng) {

    var lw = rad * -lng,
        phi = rad * lat,

        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),

        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),

        Jnoon = solarTransitJ(ds, M, L),

        i, len, time, Jset, Jrise;


    var result = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon - 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
        time = times[i];

        Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);
        Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};


// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

function moonCoords(d) { // geocentric ecliptic coordinates of the moon

    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
        M = rad * (134.963 + 13.064993 * d), // mean anomaly
        F = rad * (93.272 + 13.229350 * d),  // mean distance

        l  = L + rad * 6.289 * sin(M), // longitude
        b  = rad * 5.128 * sin(F),     // latitude
        dt = 385001 - 20905 * cos(M);  // distance to the moon in km

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        dist: dt
    };
}

SunCalc.getMoonPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec),
        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

    h = h + astroRefraction(h); // altitude correction for refraction

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
        distance: c.dist,
        parallacticAngle: pa
    };
};


// calculations for illumination parameters of the moon,
// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

SunCalc.getMoonIllumination = function (date) {

    var d = toDays(date || new Date()),
        s = sunCoords(d),
        m = moonCoords(d),

        sdist = 149598000, // distance from Earth to Sun in km

        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

    return {
        fraction: (1 + cos(inc)) / 2,
        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
        angle: angle
    };
};


function hoursLater(date, h) {
    return new Date(date.valueOf() + h * dayMs / 24);
}

// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);
    else t.setHours(0, 0, 0, 0);

    var hc = 0.133 * rad,
        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (var i = 1; i <= 24; i += 2) {
        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

        a = (h0 + h2) / 2 - h1;
        b = (h2 - h0) / 2;
        xe = -b / (2 * a);
        ye = (a * xe + b) * xe + h1;
        d = b * b - 4 * a * h1;
        roots = 0;

        if (d >= 0) {
            dx = Math.sqrt(d) / (Math.abs(a) * 2);
            x1 = xe - dx;
            x2 = xe + dx;
            if (Math.abs(x1) <= 1) roots++;
            if (Math.abs(x2) <= 1) roots++;
            if (x1 < -1) x1 = x2;
        }

        if (roots === 1) {
            if (h0 < 0) rise = i + x1;
            else set = i + x1;

        } else if (roots === 2) {
            rise = i + (ye < 0 ? x2 : x1);
            set = i + (ye < 0 ? x1 : x2);
        }

        if (rise && set) break;

        h0 = h2;
    }

    var result = {};

    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);

    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

    return result;
};


// export as Node module / AMD module / browser variable
if (true) module.exports = SunCalc;
else {}

}());


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SunAndMoonConfigCtrl = /** @class */ (function () {
    /** @ngInject */
    function SunAndMoonConfigCtrl() {
        // Flatten jsonData.position.* originating from older settings.
        if ("position" in this.current.jsonData) {
            this.current.jsonData.latitude = this.current.jsonData.position.latitude;
            this.current.jsonData.longitude = this.current.jsonData.position.longitude;
            delete this.current.jsonData.position;
        }
    }
    SunAndMoonConfigCtrl.templateUrl = "partials/config.html";
    return SunAndMoonConfigCtrl;
}());
exports.SunAndMoonConfigCtrl = SunAndMoonConfigCtrl;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_1 = __webpack_require__(7);
var SunAndMoonDatasourceQueryCtrl = /** @class */ (function (_super) {
    __extends(SunAndMoonDatasourceQueryCtrl, _super);
    function SunAndMoonDatasourceQueryCtrl($scope, $injector, uiSegmentSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.target.target = _this.target.target || "select metric";
        // Since we know this is not doing async / remote calls we can do this here
        // This allows the metric-segment component to do text / value lookup and show metric text name
        _this.datasource.metricFindQuery(_this.target).then(function (metrics) {
            _this.metrics = metrics;
        });
        return _this;
    }
    SunAndMoonDatasourceQueryCtrl.prototype.onChangeInternal = function () {
        // Ask the panel to refresh data
        this.panelCtrl.refresh();
    };
    SunAndMoonDatasourceQueryCtrl.templateUrl = "partials/query.editor.html";
    return SunAndMoonDatasourceQueryCtrl;
}(sdk_1.QueryCtrl));
exports.SunAndMoonDatasourceQueryCtrl = SunAndMoonDatasourceQueryCtrl;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ })
/******/ ])});;
//# sourceMappingURL=module.js.map