import * as module from "../src/module";

describe("SunAndMoonModule", () => {
  it("module should export all classes", () => {
      expect(module.Datasource).toBeDefined();
      expect(module.QueryCtrl).toBeDefined();
      expect(module.ConfigCtrl).toBeDefined();
      expect(module.AnnotationsQueryCtrl).toBeDefined();
      const aqc = new module.AnnotationsQueryCtrl();
  });
});
