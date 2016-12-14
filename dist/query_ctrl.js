'use strict';

System.register(['app/plugins/sdk'], function (_export, _context) {
  "use strict";

  var QueryCtrl, _createClass, SunAndMoonDatasourceQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      QueryCtrl = _appPluginsSdk.QueryCtrl;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('SunAndMoonDatasourceQueryCtrl', SunAndMoonDatasourceQueryCtrl = function (_QueryCtrl) {
        _inherits(SunAndMoonDatasourceQueryCtrl, _QueryCtrl);

        function SunAndMoonDatasourceQueryCtrl($scope, $injector, uiSegmentSrv) {
          _classCallCheck(this, SunAndMoonDatasourceQueryCtrl);

          var _this = _possibleConstructorReturn(this, (SunAndMoonDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(SunAndMoonDatasourceQueryCtrl)).call(this, $scope, $injector));

          _this.scope = $scope;
          _this.uiSegmentSrv = uiSegmentSrv;
          _this.target.target = _this.target.target || 'select metric';

          // Since we know this is not doing async / remote calls we can do this here
          // This allows the metric-segment component to do text / value lookup and show metric text name
          _this.datasource.metricFindQuery(_this.target).then(function (metrics) {
            _this.metrics = metrics;
          });
          return _this;
        }

        _createClass(SunAndMoonDatasourceQueryCtrl, [{
          key: 'onChangeInternal',
          value: function onChangeInternal() {
            // Ask the panel to refresh data
            this.panelCtrl.refresh();
          }
        }]);

        return SunAndMoonDatasourceQueryCtrl;
      }(QueryCtrl));

      _export('SunAndMoonDatasourceQueryCtrl', SunAndMoonDatasourceQueryCtrl);

      SunAndMoonDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
    }
  };
});
//# sourceMappingURL=query_ctrl.js.map
