import {SunAndMoonDatasource} from "./datasource";
import {SunAndMoonConfigCtrl} from "./config_ctrl";
import {SunAndMoonDatasourceQueryCtrl} from "./query_ctrl";

class SunAndMoonAnnotationsQueryCtrl {
  static templateUrl = "partials/annotations.editor.html";
}

export {
  SunAndMoonDatasource as Datasource,
  SunAndMoonDatasourceQueryCtrl as QueryCtrl,
  SunAndMoonConfigCtrl as ConfigCtrl,
  SunAndMoonAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
