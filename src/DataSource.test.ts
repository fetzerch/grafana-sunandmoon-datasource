import map from 'lodash/map';

import { SunAndMoonDataSource } from './DataSource';
import { DataSourceInstanceSettings, DataQueryRequest, dateTime } from '@grafana/data';
import { SunAndMoonDataSourceOptions, SunAndMoonQuery, sunAndMoonMetrics, sunAndMoonAnnotations } from './types';

jest.mock('@grafana/runtime', () => {
  const original = jest.requireActual('@grafana/runtime');
  return {
    ...original,
    getTemplateSrv: () => ({
      replace: (s: string) => s,
    }),
  };
});

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
    return datasource.query(options).then((results) => {
      expect(results.data).toHaveLength(0);
    });
  });

  it('query should return data for all implemented metrics', () => {
    const targets = map({ ...sunAndMoonMetrics, ...sunAndMoonAnnotations }, (metric, value) => {
      return { refId: value, target: [value] };
    });
    const options = {
      targets: targets,
      maxDataPoints: 10,
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/27', 'YYYY/MM/DD'),
      },
    } as DataQueryRequest<SunAndMoonQuery>;
    return datasource.query(options).then((results) => {
      expect(results.data).toHaveLength(options.targets.length);
    });
  });

  it('query should not return data for unknown metrics', () => {
    const options = {
      targets: [
        { refId: 'A', target: ['notexistent'] },
      ],
      maxDataPoints: 10,
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/27', 'YYYY/MM/DD'),
      },
    } as DataQueryRequest<SunAndMoonQuery>;
    return datasource.query(options).then((results) => {
      expect(results.data).toHaveLength(0);
    });
  });

  it('query should not return data for hidden targets', () => {
    const options = {
      targets: [
        { refId: 'A', target: ['moon_illumination'] },
        { refId: 'B', target: ['moon_altitude'], hide: true },
      ],
      maxDataPoints: 10,
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/27', 'YYYY/MM/DD'),
      },
    } as DataQueryRequest<SunAndMoonQuery>;
    return datasource.query(options).then((results) => {
      expect(results.data).toHaveLength(1);
    });
  });

  it('query should support position override', async () => {
    const options = {
      targets: [{ refId: 'A', target: ['sun_altitude'], latitude: '50', longitude: '20' }],
      maxDataPoints: 10,
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/27', 'YYYY/MM/DD'),
      },
    } as DataQueryRequest<SunAndMoonQuery>;
    return datasource.query(options).then((results) => {
      expect(results.data).toHaveLength(options.targets.length);
    });
  });

  it('query should inform user about position override errors', () => {
    const options = {
      targets: [{ refId: 'A', target: ['moon_illumination'], latitude: 'xxx', longitude: 'yyy' }],
      maxDataPoints: 10,
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/27', 'YYYY/MM/DD'),
      },
    } as DataQueryRequest<SunAndMoonQuery>;
    return expect(datasource.query(options)).rejects.toThrow('Error in query');
  });

  it('query should support legacy single value metrics', () => {
    const options = {
      targets: [
        { refId: 'A', target: 'sun_altitude' },
      ],
      maxDataPoints: 10,
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/27', 'YYYY/MM/DD'),
      },
    } as any;
    return datasource.query(options).then((results) => {
      expect(results.data).toHaveLength(1);
    });
  });

  it('query should support legacy annotation queries', () => {
    const options = {
      targets: [
        { refId: 'A', query: 'sunrise,moonrise' },
      ],
      maxDataPoints: 10,
      range: {
        from: dateTime('2019/03/26', 'YYYY/MM/DD'),
        to: dateTime('2019/03/27', 'YYYY/MM/DD'),
      },
    } as any;
    return datasource.query(options).then((results) => {
      expect(results.data).toHaveLength(2);
    });
  });

  it('testDatasource should return success for valid gps position', () => {
    datasource.latitude = 0;
    datasource.longitude = 0;
    return datasource.testDatasource().then((results) => {
      expect(results).toMatchObject({ status: 'success' });
    });
  });

  it('testDatasource should return error if latitude < -90', () => {
    datasource.latitude = -91;
    datasource.longitude = 0;
    return datasource.testDatasource().then((results) => {
      expect(results).toMatchObject({ status: 'error' });
    });
  });

  it('testDatasource should return error if latitude > -90', () => {
    datasource.latitude = 91;
    datasource.longitude = 0;
    return datasource.testDatasource().then((results) => {
      expect(results).toMatchObject({ status: 'error' });
    });
  });

  it('testDatasource should return error if longitude < -360', () => {
    datasource.latitude = 0;
    datasource.longitude = -361;
    return datasource.testDatasource().then((results) => {
      expect(results).toMatchObject({ status: 'error' });
    });
  });

  it('testDatasource should return error if longitude > 360', () => {
    datasource.latitude = 0;
    datasource.longitude = 361;
    return datasource.testDatasource().then((results) => {
      expect(results).toMatchObject({ status: 'error' });
    });
  });
});
