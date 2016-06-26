import {SunAndMoonDatasource} from './datasource';
import {SunAndMoonDatasourceQueryCtrl} from './query_ctrl';

class SunAndMoonConfigCtrl {}
SunAndMoonConfigCtrl.templateUrl = 'partials/config.html';

class SunAndMoonQueryOptionsCtrl {}
SunAndMoonQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

class SunAndMoonAnnotationsQueryCtrl {}
SunAndMoonAnnotationsQueryCtrl.templateUrl =
  'partials/annotations.editor.html';

export {
  SunAndMoonDatasource as Datasource,
  SunAndMoonDatasourceQueryCtrl as QueryCtrl,
  SunAndMoonConfigCtrl as ConfigCtrl,
  SunAndMoonQueryOptionsCtrl as QueryOptionsCtrl,
  SunAndMoonAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
