import { SunAndMoonDataSource } from './DataSource';
import { DataSourceInstanceSettings, DataQueryRequest, AnnotationQueryRequest, dateTime } from '@grafana/data';
import { SunAndMoonDataSourceOptions, SunAndMoonQuery, SunAndMoonAnnotationQuery } from './types';

describe('SunAndMoonDatasource', () => {
  let datasource: SunAndMoonDataSource;

  beforeEach(() => {
    const config = {
      jsonData: {
        latitude: 48,
        longitude: 10,
      },
    } as DataSourceInstanceSettings<SunAndMoonDataSourceOptions>;
    datasource = new SunAndMoonDataSource(config);
  });

  it('query should return an empty array when no targets are set', () => {
    const options: any = {
      targets: [],
      maxDataPoints: 10,
      range: {
        from: dateTime('2016/06/25', 'YYYY/MM/DD'),
        to: dateTime('2016/06/26', 'YYYY/MM/DD'),
      },
    };
    return datasource.query(options).then(results => {
      expect(results.data).toHaveLength(0);
    });
  });

  it('query should return values', () => {
    const options = {
      targets: [
        { refId: 'A', target: 'moon_illumination' },
        { refId: 'B', target: 'moon_altitude' },
        { refId: 'C', target: 'moon_azimuth' },
        { refId: 'D', target: 'moon_distance' },
        { refId: 'E', target: 'sun_altitude' },
        { refId: 'F', target: 'sun_azimuth' },
      ],
      maxDataPoints: 10,
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/27', 'YYYY/MM/DD'),
      },
    } as DataQueryRequest<SunAndMoonQuery>;
    return datasource.query(options).then(results => {
      expect(results.data).toHaveLength(options.targets.length);
    });
  });

  it('annotationQuery should return all values', () => {
    const options = {
      annotation: {},
      dashboard: { getTimezone: () => 'utc' },
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/26', 'YYYY/MM/DD'),
      },
    } as AnnotationQueryRequest<SunAndMoonAnnotationQuery>;
    return datasource.annotationQuery(options).then(results => {
      expect(results).toHaveLength(17);
    });
  });

  it('annotationQuery should return specified values', () => {
    const options = {
      annotation: { query: 'dusk, dawn' },
      dashboard: { getTimezone: () => 'utc' },
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/26', 'YYYY/MM/DD'),
      },
    } as AnnotationQueryRequest<SunAndMoonAnnotationQuery>;
    return datasource.annotationQuery(options).then(results => {
      expect(results).toHaveLength(2);
    });
  });

  it('annotationQuery should bail out if range is too wide', () => {
    const options = {
      annotation: {},
      dashboard: { getTimezone: () => 'utc' },
      range: {
        from: dateTime('2016/01/01', 'YYYY/MM/DD'),
        to: dateTime('2019/12/31', 'YYYY/MM/DD'),
      },
    } as AnnotationQueryRequest<SunAndMoonAnnotationQuery>;
    return datasource.annotationQuery(options).then(results => {
      expect(results).toHaveLength(0);
    });
  });

  it('annotationQuery should support local time', () => {
    const options = {
      annotation: {},
      dashboard: { getTimezone: () => 'Europe/Berlin' },
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/26', 'YYYY/MM/DD'),
      },
    } as AnnotationQueryRequest<SunAndMoonAnnotationQuery>;
    return datasource.annotationQuery(options).then(results => {
      expect(results).toHaveLength(17);
    });
  });

  it('testDatasource should return success for valid gps position', () => {
    datasource.position.latitude = 0;
    datasource.position.longitude = 0;
    return datasource.testDatasource().then(results => {
      expect(results).toMatchObject({ status: 'success' });
    });
  });

  it('testDatasource should return error if latitude < -90', () => {
    datasource.position.latitude = -91;
    datasource.position.longitude = 0;
    return datasource.testDatasource().then(results => {
      expect(results).toMatchObject({ status: 'error' });
    });
  });

  it('testDatasource should return error if latitude > -90', () => {
    datasource.position.latitude = 91;
    datasource.position.longitude = 0;
    return datasource.testDatasource().then(results => {
      expect(results).toMatchObject({ status: 'error' });
    });
  });

  it('testDatasource should return error if longitude < -360', () => {
    datasource.position.latitude = 0;
    datasource.position.longitude = -361;
    return datasource.testDatasource().then(results => {
      expect(results).toMatchObject({ status: 'error' });
    });
  });

  it('testDatasource should return error if longitude > 360', () => {
    datasource.position.latitude = 0;
    datasource.position.longitude = 361;
    return datasource.testDatasource().then(results => {
      expect(results).toMatchObject({ status: 'error' });
    });
  });
});
