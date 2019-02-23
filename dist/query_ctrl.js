"use strict";

System.register(["app/plugins/sdk"], function (_export, _context) {
  "use strict";

  var QueryCtrl, SunAndMoonDatasourceQueryCtrl;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_appPluginsSdk) {
      QueryCtrl = _appPluginsSdk.QueryCtrl;
    }],
    execute: function () {
      _export("SunAndMoonDatasourceQueryCtrl", SunAndMoonDatasourceQueryCtrl =
      /*#__PURE__*/
      function (_QueryCtrl) {
        _inherits(SunAndMoonDatasourceQueryCtrl, _QueryCtrl);

        function SunAndMoonDatasourceQueryCtrl($scope, $injector, uiSegmentSrv) {
          var _this;

          _classCallCheck(this, SunAndMoonDatasourceQueryCtrl);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(SunAndMoonDatasourceQueryCtrl).call(this, $scope, $injector));
          _this.scope = $scope;
          _this.uiSegmentSrv = uiSegmentSrv;
          _this.target.target = _this.target.target || 'select metric'; // Since we know this is not doing async / remote calls we can do this here
          // This allows the metric-segment component to do text / value lookup and show metric text name

          _this.datasource.metricFindQuery(_this.target).then(function (metrics) {
            _this.metrics = metrics;
          });

          return _this;
        }

        _createClass(SunAndMoonDatasourceQueryCtrl, [{
          key: "onChangeInternal",
          value: function onChangeInternal() {
            // Ask the panel to refresh data
            this.panelCtrl.refresh();
          }
        }]);

        return SunAndMoonDatasourceQueryCtrl;
      }(QueryCtrl));

      SunAndMoonDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
    }
  };
});
//# sourceMappingURL=query_ctrl.js.map
