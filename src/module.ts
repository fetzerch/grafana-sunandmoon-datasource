import { DataSourcePlugin } from '@grafana/data';
import { SunAndMoonDataSource } from './DataSource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
import { SunAndMoonQuery, SunAndMoonDataSourceOptions } from './types';

export const plugin = new DataSourcePlugin<SunAndMoonDataSource, SunAndMoonQuery, SunAndMoonDataSourceOptions>(
  SunAndMoonDataSource
)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor)
