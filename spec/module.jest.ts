import * as module from "../src/module";

describe("SunAndMoonModule", () => {
  it("module should export all classes", () => {
      expect(module.Datasource).toBeDefined();
      expect(module.QueryCtrl).toBeDefined();
      expect(module.ConfigCtrl).toBeDefined();
      expect(module.QueryOptionsCtrl).toBeDefined();
      expect(module.AnnotationsQueryCtrl).toBeDefined();
      const qoc = new module.QueryOptionsCtrl();
      const aqc = new module.AnnotationsQueryCtrl();
  });
});
