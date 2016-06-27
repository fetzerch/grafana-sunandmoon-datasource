[![Circle CI Status](https://circleci.com/gh/fetzerch/grafana-sunandmoon-datasource.svg?style=shield&circle-token=2e270ffe5a00a9187d96ab5f27e44a143ada2cce)](https://circleci.com/gh/fetzerch/grafana-sunandmoon-datasource)

# Sun and Moon Datasource Plugin for Grafana

SunAndMoon is a Datasource Plugin for [Grafana](https://grafana.org) that
calculates the position of Sun and Moon as well as the Moon illumination using
[SunCalc](https://github.com/mourner/suncalc).

Additionally it provides annotations for sunrise, sunset, twilight,
moonrise, moonset and others.

![SunAndMoon](src/img/screenshot.png)

## Configuration

All values are location dependent, the reference location needs to be
configured in the datasource settings.

![SunAndMoon Configuration](src/img/configuration.png)

## License

This projected is licensed under the terms of the MIT license.
