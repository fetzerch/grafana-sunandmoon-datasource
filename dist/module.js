"use strict";

System.register(["./datasource", "./config_ctrl", "./query_ctrl"], function (_export, _context) {
  "use strict";

  var SunAndMoonDatasource, SunAndMoonConfigCtrl, SunAndMoonDatasourceQueryCtrl, SunAndMoonQueryOptionsCtrl, SunAndMoonAnnotationsQueryCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_datasource) {
      SunAndMoonDatasource = _datasource.SunAndMoonDatasource;
    }, function (_config_ctrl) {
      SunAndMoonConfigCtrl = _config_ctrl.SunAndMoonConfigCtrl;
    }, function (_query_ctrl) {
      SunAndMoonDatasourceQueryCtrl = _query_ctrl.SunAndMoonDatasourceQueryCtrl;
    }],
    execute: function () {
      _export("QueryOptionsCtrl", SunAndMoonQueryOptionsCtrl = function SunAndMoonQueryOptionsCtrl() {
        _classCallCheck(this, SunAndMoonQueryOptionsCtrl);
      });

      SunAndMoonQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

      _export("AnnotationsQueryCtrl", SunAndMoonAnnotationsQueryCtrl = function SunAndMoonAnnotationsQueryCtrl() {
        _classCallCheck(this, SunAndMoonAnnotationsQueryCtrl);
      });

      SunAndMoonAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

      _export("Datasource", SunAndMoonDatasource);

      _export("QueryCtrl", SunAndMoonDatasourceQueryCtrl);

      _export("ConfigCtrl", SunAndMoonConfigCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
