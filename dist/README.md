[![Build Status](https://travis-ci.org/fetzerch/grafana-sunandmoon-datasource.svg?branch=master)](https://travis-ci.org/fetzerch/grafana-sunandmoon-datasource)

# Sun and Moon Datasource Plugin for Grafana

SunAndMoon is a Datasource Plugin for [Grafana](https://grafana.org) that
calculates the position of Sun and Moon as well as the Moon illumination using
[SunCalc](https://github.com/mourner/suncalc).

Additionally it provides annotations for sunrise, sunset, twilight,
moonrise, moonset and others.

![SunAndMoon](https://raw.githubusercontent.com/fetzerch/grafana-sunandmoon-datasource/master/src/img/screenshot.png)

## Configuration

All values are location dependent, the reference location needs to be
configured in the datasource settings.

![SunAndMoon Configuration](https://raw.githubusercontent.com/fetzerch/grafana-sunandmoon-datasource/master/src/img/configuration.png)

## License

This projected is licensed under the terms of the MIT license.

---

## Changelog

### v0.1.4 (03/19)

- Added Support for [datasource provisioning](http://docs.grafana.org/administration/provisioning/#datasources).

### v0.1.3 (02/19)

- Update SunCalc dependency to 1.8.0.
- Update other dependencies to the latest versions.

### v0.1.2 (12/16)

- Fixed compatibility with Grafana 4.0.

### v0.1.1 (07/16)

- Fixed bug where only the first of multiple configured annotations was
  displayed.

### v0.1.0 (06/16)

- Initial version with sun and moon calculation and annotations.
