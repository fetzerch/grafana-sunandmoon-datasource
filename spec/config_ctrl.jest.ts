import {SunAndMoonConfigCtrl} from "../src/config_ctrl";

describe("SunAndMoonConfigCtrl", () => {
  it("config_ctrl should support new position format", () => {
    SunAndMoonConfigCtrl.prototype.current = {
      jsonData: {
        latitude: 48,
        longitude: 10
      }
    };
    const cc = new SunAndMoonConfigCtrl();
    expect(cc.current.jsonData).toEqual({latitude: 48, longitude: 10});
  });

  it("config_ctrl should support old position format", () => {
    SunAndMoonConfigCtrl.prototype.current = {
      jsonData: {
        position: {
          latitude: 48,
          longitude: 10
        }
      }
    };
    const cc = new SunAndMoonConfigCtrl();
    expect(cc.current.jsonData).toEqual({latitude: 48, longitude: 10});
  });
});
