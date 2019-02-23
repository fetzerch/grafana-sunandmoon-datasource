"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var SunAndMoonConfigCtrl;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      _export("SunAndMoonConfigCtrl", SunAndMoonConfigCtrl = function SunAndMoonConfigCtrl() {
        _classCallCheck(this, SunAndMoonConfigCtrl);

        // Flatten jsonData.position.* originating from older settings.
        if ('position' in this.current.jsonData) {
          this.current.jsonData.latitude = this.current.jsonData.position.latitude;
          this.current.jsonData.longitude = this.current.jsonData.position.longitude;
          delete this.current.jsonData.position;
        }
      });

      SunAndMoonConfigCtrl.templateUrl = 'partials/config.html';
    }
  };
});
//# sourceMappingURL=config_ctrl.js.map
