import {SunAndMoonDatasource} from "../src/datasource";
import moment from "moment";
import q from "q";

describe("SunAndMoonDatasource", () => {
  const ctx: any = {};

  beforeEach(() => {
    ctx.config = {
      jsonData: {
        latitude: 48,
        longitude: 10
      }
    };
    ctx.$q = q;
    ctx.ds = new SunAndMoonDatasource(ctx.config, {}, {}, ctx.$q);
  });

  it("query should return an empty array when no targets are set", () => {
    const options = {
      targets: [],
      maxDataPoints: 10,
      range: {
        from: moment("2016/06/25", "YYYY/MM/DD"),
        to: moment("2016/06/26", "YYYY/MM/DD")
      }
    };
    return ctx.ds.query(options).then(results => {
      expect(results.data).toHaveLength(0);
    });
  });

  it("query should return values", () => {
    const options = {
      targets: [
        {refId: "A", target: "moon_illumination"},
        {refId: "B", target: "moon_altitude"},
        {refId: "C", target: "moon_azimuth"},
        {refId: "D", target: "moon_distance"},
        {refId: "E", target: "sun_altitude"},
        {refId: "F", target: "sun_azimuth"}
      ],
      maxDataPoints: 10,
      range: {
        from: moment("2019/03/26", "YYYY/MM/DD"),
        to: moment("2019/03/27", "YYYY/MM/DD")
      }
    };
    return ctx.ds.query(options).then(results => {
      expect(results.data).toHaveLength(options.targets.length);
    });
  });

  it("annotationQuery should return all values", () => {
    const options = {
      annotation: {},
        dashboard: { isTimezoneUtc: () => true },
      range: {
        from: moment("2019/03/26", "YYYY/MM/DD"),
        to: moment("2019/03/26", "YYYY/MM/DD")
      }
    };
    return ctx.ds.annotationQuery(options).then(results => {
      expect(results).toHaveLength(17);
    });
  });

  it("annotationQuery should return specified values", () => {
    const options = {
      annotation: { query: "dusk, dawn"},
        dashboard: { isTimezoneUtc: () => true },
      range: {
        from: moment("2019/03/26", "YYYY/MM/DD"),
        to: moment("2019/03/26", "YYYY/MM/DD")
      }
    };
    return ctx.ds.annotationQuery(options).then(results => {
      expect(results).toHaveLength(2);
    });
  });

  it("annotationQuery should support local time", () => {
    const options = {
      annotation: {},
        dashboard: { isTimezoneUtc: () => false },
      range: {
        from: moment("2019/03/26", "YYYY/MM/DD"),
        to: moment("2019/03/26", "YYYY/MM/DD")
      }
    };
    return ctx.ds.annotationQuery(options).then(results => {
      expect(results).toHaveLength(17);
    });
  });

  it("testDatasource should return success for valid gps position", () => {
    ctx.ds.position.latitude = 0;
    ctx.ds.position.longitude = 0;
    return ctx.ds.testDatasource().then(results => {
      expect(results).toMatchObject({"status": "success"});
    });
  });

  it("testDatasource should return error if latitude < -90", () => {
    ctx.ds.position.latitude = -91;
    ctx.ds.position.longitude = 0;
    return ctx.ds.testDatasource().then(results => {
      expect(results).toMatchObject({"status": "error"});
    });
  });

  it("testDatasource should return error if latitude > -90", () => {
    ctx.ds.position.latitude = 91;
    ctx.ds.position.longitude = 0;
    return ctx.ds.testDatasource().then(results => {
      expect(results).toMatchObject({"status": "error"});
    });
  });

  it("testDatasource should return error if longitude < -360", () => {
    ctx.ds.position.latitude = 0;
    ctx.ds.position.longitude = -361;
    return ctx.ds.testDatasource().then(results => {
      expect(results).toMatchObject({"status": "error"});
    });
  });

  it("testDatasource should return error if longitude > 360", () => {
    ctx.ds.position.latitude = 0;
    ctx.ds.position.longitude = 361;
    return ctx.ds.testDatasource().then(results => {
      expect(results).toMatchObject({"status": "error"});
    });
  });

  it("metricFindQuery should return all available metrics", () => {
    return ctx.ds.metricFindQuery().then(results => {
      expect(results).toEqual([
        {"text": "Moon illumination", "value": "moon_illumination"},
        {"text": "Moon altitude", "value": "moon_altitude"},
        {"text": "Moon azimuth", "value": "moon_azimuth"},
        {"text": "Moon distance", "value": "moon_distance"},
        {"text": "Sun altitude", "value": "sun_altitude"},
        {"text": "Sun azimuth", "value": "sun_azimuth"}
      ]);
    });
  });

  it("datasource should support old position format", () => {
    const oldConfig: any = { jsonData: {} };
    oldConfig.jsonData.position = ctx.config.jsonData;
    const ds = new SunAndMoonDatasource(oldConfig, {}, {}, ctx.$q);
    expect(ds.position).toEqual(ctx.ds.position);
  });
});
