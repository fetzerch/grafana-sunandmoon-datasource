import {SunAndMoonDatasource} from "./datasource";
import {SunAndMoonConfigCtrl} from "./config_ctrl";
import {SunAndMoonDatasourceQueryCtrl} from "./query_ctrl";

class SunAndMoonQueryOptionsCtrl {
  static templateUrl = "partials/query.options.html";
}

class SunAndMoonAnnotationsQueryCtrl {
  static templateUrl = "partials/annotations.editor.html";
}

export {
  SunAndMoonDatasource as Datasource,
  SunAndMoonDatasourceQueryCtrl as QueryCtrl,
  SunAndMoonConfigCtrl as ConfigCtrl,
  SunAndMoonQueryOptionsCtrl as QueryOptionsCtrl,
  SunAndMoonAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
