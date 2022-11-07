import * as SunCalc from 'suncalc';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  dateTimeParse,
  FieldType,
  MutableDataFrame,
  dateTime,
} from '@grafana/data';

import { getTemplateSrv } from '@grafana/runtime';

import {
  SunAndMoonQuery,
  SunAndMoonDataSourceOptions,
  sunAndMoonMetrics,
  sunAndMoonAnnotations,
} from './types';

import { migrateQuery } from 'migrations';

export class SunAndMoonDataSource extends DataSourceApi<SunAndMoonQuery, SunAndMoonDataSourceOptions> {
  latitude?: number;
  longitude?: number;

  /* istanbul ignore next: workaround for https://github.com/gotwarlost/istanbul/issues/690 */
  constructor(instanceSettings: DataSourceInstanceSettings<SunAndMoonDataSourceOptions>) {
    super(instanceSettings);

    this.latitude = instanceSettings.jsonData.latitude;
    this.longitude = instanceSettings.jsonData.longitude;
    this.annotations = {}
  }

  async query(options: DataQueryRequest<SunAndMoonQuery>): Promise<DataQueryResponse> {
    const { range } = options;

    let errors: string[] = [];
    const targets = options.targets.filter((target) => !target.hide);

    let frames: MutableDataFrame[] = [];
    for (const target of targets) {
      let latitude = this.latitude;
      if (!!target.latitude) {
        latitude = parseFloat(getTemplateSrv().replace(target.latitude, options.scopedVars));
        if (isNaN(latitude) || latitude < -90 || latitude > 90) {
          errors.push(`Error in query ${target.refId}: Latitude '${latitude}' not in range -+90.`);
        }
      }
      let longitude = this.longitude;
      if (!!target.longitude) {
        longitude = parseFloat(getTemplateSrv().replace(target.longitude, options.scopedVars));
        if (isNaN(longitude) || longitude < -360 || longitude > 360) {
          errors.push(`Error in query ${target.refId}: Longitude '${longitude}' not in range -+360`);
        }
      }

      migrateQuery(target);

      const metrics = target.target!.filter((target) => target in sunAndMoonMetrics);
      const annotations = target.target!.filter((target) => target in sunAndMoonAnnotations);

      if (metrics.length) {
        for (const metric of metrics) {
          const frame = new MutableDataFrame({
            refId: target.refId,
            name: sunAndMoonMetrics[metric].title,
            fields: [
              { name: 'Time', type: FieldType.time },
              { name: 'Value', type: FieldType.number, config: sunAndMoonMetrics[metric].config },
            ],
          });
          let value = undefined;
          for (let time = range.from.valueOf(); time < range.to.valueOf(); time += options.intervalMs) {
            switch (metric) {
              case 'moon_illumination':
                value = SunCalc.getMoonIllumination(new Date(time)).fraction;
                break;
              case 'moon_altitude':
                value = (SunCalc.getMoonPosition(new Date(time), latitude!, longitude!).altitude * 180) / Math.PI;
                break;
              case 'moon_azimuth':
                value = (SunCalc.getMoonPosition(new Date(time), latitude!, longitude!).azimuth * 180) / Math.PI + 180;
                break;
              case 'moon_distance':
                value = SunCalc.getMoonPosition(new Date(time), latitude!, longitude!).distance;
                break;
              case 'sun_altitude':
                value = (SunCalc.getPosition(new Date(time), latitude!, longitude!).altitude * 180) / Math.PI;
                break;
              case 'sun_azimuth':
                value = (SunCalc.getPosition(new Date(time), latitude!, longitude!).azimuth * 180) / Math.PI + 180;
                break;
            }
            if (value !== undefined) {
              frame.add({ Time: time, Value: value });
            }
          }
          frames.push(frame);
        }
      }
      if (annotations.length) {
        for (const annotation of annotations) {
          const frame = new MutableDataFrame({
            refId: target.refId,
            name: sunAndMoonAnnotations[annotation].title,
            fields: [
              { name: 'Time', type: FieldType.time },
              { name: 'Title', type: FieldType.string },
              { name: 'Text', type: FieldType.string },
              { name: 'Tags', type: FieldType.other },
            ],
          });

          for (const date = dateTime(range.from.valueOf()); date < dateTime(range.to.valueOf()).add(1, 'days'); date.add(1, 'days')) {
            let time = undefined;
            switch (annotation) {
              case 'sunrise':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).sunrise;
                break;
              case 'sunriseEnd':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).sunriseEnd;
                break;
              case 'goldenHour':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).goldenHour;
                break;
              case 'goldenHourEnd':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).goldenHourEnd;
                break;
              case 'solarNoon':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).solarNoon;
                break;
              case 'sunsetStart':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).sunsetStart;
                break;
              case 'sunset':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).sunset;
                break;
              case 'dusk':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).dusk;
                break;
              case 'nauticalDusk':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).nauticalDusk;
                break;
              case 'nauticalDawn':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).nauticalDawn;
                break;
              case 'night':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).night;
                break;
              case 'nightEnd':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).nightEnd;
                break;
              case 'nadir':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).nadir;
                break;
              case 'dawn':
                time = SunCalc.getTimes(date.toDate(), latitude!, longitude!).dawn;
                break;
              case 'moonrise':
                time = SunCalc.getMoonTimes(date.toDate(), latitude!, longitude!).rise;
                break;
              case 'moonset':
                time = SunCalc.getMoonTimes(date.toDate(), latitude!, longitude!).set;
                break;
              case 'noon':
                time = dateTimeParse(`${date.format("YYYY-MM-DD")} 12:00:00`, { timeZone: options.timezone });
                break;
              case 'midnight':
                time = dateTimeParse(`${date.format("YYYY-MM-DD")} 00:00:00`, { timeZone: options.timezone });
                break;
            }
            if (time !== undefined) {
              frame.add({
                Time: time!.valueOf(),
                Title: sunAndMoonAnnotations[annotation].title,
                Text: sunAndMoonAnnotations[annotation].text,
                Tags: sunAndMoonAnnotations[annotation].tags,
              });
            }
          }
          frames.push(frame);
        }
      }
    }

    if (errors.length) {
      throw new Error(errors.join(' '));
    } else {
      return { data: frames };
    }
  }

  async testDatasource() {
    let errors: string[] = [];
    if (this.latitude === undefined || this.latitude < -90 || this.latitude > 90) {
      errors.push('Latitude not in range -+90.');
    }
    if (this.longitude === undefined || this.longitude < -360 || this.longitude > 360) {
      errors.push('Longitude not in range -+360.');
    }
    if (errors.length) {
      return { status: 'error', title: 'Error', message: errors.join(' ') };
    } else {
      return { status: 'success', title: 'Success', message: 'Datasource added successfully.' };
    }
  }
}
