import defaults from 'lodash/defaults';
import map from 'lodash/map';

import React, { PureComponent } from 'react';
import { InlineFormLabel, Select } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { SunAndMoonDataSource } from './DataSource';
import { SunAndMoonDataSourceOptions, SunAndMoonQuery, sunAndMoonDefaultQuery, sunAndMoonMetrics } from './types';

export type Props = QueryEditorProps<SunAndMoonDataSource, SunAndMoonQuery, SunAndMoonDataSourceOptions>;

const metrics = map(sunAndMoonMetrics, (label, metric) => {
  return { label: label, value: metric };
});

export class QueryEditor extends PureComponent<Props> {
  onMetricChanged = (selected: SelectableValue<string>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, target: selected.value });
    onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, sunAndMoonDefaultQuery);
    return (
      <div className="gf-form">
        <InlineFormLabel>Metric</InlineFormLabel>
        <Select
          className="metric"
          options={metrics}
          value={query.target}
          onChange={this.onMetricChanged}
          placeholder="Metric"
        />
      </div>
    );
  }
}
