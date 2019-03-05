import {QueryCtrl} from "grafana/app/plugins/sdk";

export class SunAndMoonDatasourceQueryCtrl extends QueryCtrl {
  static templateUrl = "partials/query.editor.html";
  metrics: any;

  constructor($scope, $injector, uiSegmentSrv)  {
    super($scope, $injector);

    this.target.target = this.target.target || "select metric";

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
