import {QueryCtrl} from 'app/plugins/sdk';

export class SunAndMoonDatasourceQueryCtrl extends QueryCtrl {

  constructor($scope, $injector, uiSegmentSrv)  {
    super($scope, $injector);

    this.scope = $scope;
    this.uiSegmentSrv = uiSegmentSrv;
    this.target.target = this.target.target || 'select metric';
  }

  getOptions() {
    return this.datasource.metricFindQuery(this.target)
      .then(this.uiSegmentSrv.transformToSegments(false));
  }

  onChangeInternal() {
    // Ask the panel to refresh data
    this.panelCtrl.refresh();
  }
}

SunAndMoonDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
