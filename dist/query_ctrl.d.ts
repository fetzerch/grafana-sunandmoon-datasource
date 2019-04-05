import { QueryCtrl } from "grafana/app/plugins/sdk";
export declare class SunAndMoonDatasourceQueryCtrl extends QueryCtrl {
    static templateUrl: string;
    metrics: any;
    constructor($scope: any, $injector: any, uiSegmentSrv: any);
}
