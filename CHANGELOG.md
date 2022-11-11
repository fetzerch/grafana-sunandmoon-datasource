# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2022-11-11

### Fixed

- Noon and Midnight notifications did not show correct values for non default
  timezones.
- The 'Min interval' query option was not taken into account.

### Added

- Events / annotations can be queried as metrics. This allows to visualize for
  example today's sunrise/sunset time on dashboards. ([#20](https://github.com/fetzerch/grafana-sunandmoon-datasource/issues/20))
- Dashboard options such as units are automatically set.

### Changed

- The annotations were migrated to the new react based plugin framework
  introduced in Grafana 7.2 and the plugin is no longer compatible with older
  versions of Grafana.
- A single query now supports multiple metrics.

## [0.2.1] - 2020-11-27

### Added

- Allow per query override of location. ([#35](https://github.com/fetzerch/grafana-sunandmoon-datasource/issues/35),
  [#5](https://github.com/fetzerch/grafana-sunandmoon-datasource/issues/5))

## [0.2.0] - 2020-11-20

### Fixed

- Glitches in graphs caused by out of order data. ([#29](https://github.com/fetzerch/grafana-sunandmoon-datasource/issues/29),
  [grafana/#28804](https://github.com/grafana/grafana/issues/28804))
- Annotations are no longer shown. ([#31](https://github.com/fetzerch/grafana-sunandmoon-datasource/issues/31))
- A metric is now preselected when using the datasource on a new panel.

### Added

- Location is now automatically configured.

### Changed

- The plugin was migrated to the new plugin framework introduced in Grafana
  7.0 and is no longer compatible with older versions of Grafana.

## [0.1.6] - 2020-05-24

### Fixed

- Compatibility with Grafana 7.0.

## [0.1.5] - 2019-08-01

### Fixed

- Annotations were incorrectly tagged with a single tag per character
  (e.g. `s`, `u`, `n` instead of `sun`). ([grafana/#15987](https://github.com/grafana/grafana/pull/15987))
- Compatibility with Grafana v3.
- Compatibility with Grafana v6.3.

## [0.1.4] - 2019-03-08

### Added

- Support [datasource provisioning](https://docs.grafana.org/administration/provisioning/#datasources).
  ([#11](https://github.com/fetzerch/grafana-sunandmoon-datasource/issues/11))
- Annotations for noon and midnight. ([#3](https://github.com/fetzerch/grafana-sunandmoon-datasource/issues/3))

## [0.1.3] - 2019-02-24

### Fixed

- Update [SunCalc](https://github.com/mourner/suncalc#changelog) dependency to
  1.8.0 with improved precision for moonrise/moonset calculations. ([#8](https://github.com/fetzerch/grafana-sunandmoon-datasource/issues/8))
- Update build dependencies to the latest versions. ([#12](https://github.com/fetzerch/grafana-sunandmoon-datasource/pull/12))

## [0.1.2] - 2016-12-12

### Fixed

- Compatibility with Grafana 4.0. ([#6](https://github.com/fetzerch/grafana-sunandmoon-datasource/issues/6))

## [0.1.1] - 2016-07-01

### Fixed

- Only the first of multiple configured annotations was displayed. ([#2](https://github.com/fetzerch/grafana-sunandmoon-datasource/pull/2))

## [0.1.0] - 2016-06-27

### Added

- Initial version with sun and moon calculation and annotations.

[Unreleased]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.2.1...HEAD
[0.3.0]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.1.6...v0.2.0
[0.1.6]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.1.5...v0.1.6
[0.1.5]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/fetzerch/grafana-sunandmoon-datasource/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/fetzerch/grafana-sunandmoon-datasource/commits/v0.1.0
