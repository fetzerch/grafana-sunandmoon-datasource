import {SunAndMoonDatasourceQueryCtrl} from "../src/query_ctrl";

describe("SunAndMoonQueryCtrl", () => {
  const ctx: any = {};

  beforeEach(() => {
    ctx.datasource = { metricFindQuery: jest.fn(() => Promise.resolve([])) };
    ctx.panelCtrl = { refresh: jest.fn() };
    SunAndMoonDatasourceQueryCtrl.prototype.datasource = ctx.datasource;
    SunAndMoonDatasourceQueryCtrl.prototype.panelCtrl = ctx.panelCtrl;

    ctx.qc = new SunAndMoonDatasourceQueryCtrl({}, {}, {});
  });

  it("constructor should query metrics", () => {
    expect(ctx.datasource.metricFindQuery).toHaveBeenCalled();
  });
});
