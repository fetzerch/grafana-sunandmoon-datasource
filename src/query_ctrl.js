import {QueryCtrl} from 'app/plugins/sdk';

export class SunAndMoonDatasourceQueryCtrl extends QueryCtrl {

  constructor($scope, $injector, uiSegmentSrv)  {
    super($scope, $injector);

    this.scope = $scope;
    this.uiSegmentSrv = uiSegmentSrv;
    this.target.target = this.target.target || 'select metric';

    // Since we know this is not doing async / remote calls we can do this here
    // This allows the metric-segment component to do text / value lookup and show metric text name
    this.datasource.metricFindQuery(this.target).then(metrics => {
      this.metrics = metrics;
    });
  }

  onChangeInternal() {
    // Ask the panel to refresh data
    this.panelCtrl.refresh();
  }
}

SunAndMoonDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
