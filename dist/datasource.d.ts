import * as SunCalc from "suncalc";
interface Position {
    latitude: number;
    longitude: number;
}
export declare class SunAndMoonDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    position: Position;
    metrics: any;
    annotations: any;
    private moonPosition;
    private sunPosition;
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    cachedMoonPosition(time: any): SunCalc.GetMoonPositionResult;
    cachedSunPosition(time: any): SunCalc.GetSunPositionResult;
    cleanCachedPositions(): void;
    query(options: any): any;
    annotationQuery(options: any): any;
    testDatasource(): any;
    metricFindQuery(): any;
}
export {};
