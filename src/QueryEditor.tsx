import defaults from 'lodash/defaults';
import map from 'lodash/map';

import React, { ChangeEvent, PureComponent } from 'react';
import { InlineFormLabel, InlineField, Input, Select } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { SunAndMoonDataSource } from './DataSource';
import { SunAndMoonDataSourceOptions, SunAndMoonQuery, sunAndMoonDefaultQuery, sunAndMoonMetrics } from './types';

export type Props = QueryEditorProps<SunAndMoonDataSource, SunAndMoonQuery, SunAndMoonDataSourceOptions>;

const metrics = map(sunAndMoonMetrics, (metric, value) => {
  return { label: metric.title, value: value, description: metric.text };
}) as Array<SelectableValue<string>>;

export class QueryEditor extends PureComponent<Props> {
  onMetricChanged = (selected: SelectableValue<string>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, target: selected.value });
    onRunQuery();
  };

  onLatitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, latitude: event.target.value });
    onRunQuery();
  };

  onLongitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, longitude: event.target.value });
    onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, sunAndMoonDefaultQuery);
    const { datasource } = this.props;

    return (
      <div className="gf-form-group">
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
        <div className="gf-form gf-form--grow">
          <InlineField label="Override Latitude" labelWidth={20}>
            <Input
              className="latitude"
              label="Latitude"
              onChange={this.onLatitudeChange}
              value={query.latitude}
              placeholder={datasource.latitude!.toString()}
              width={32}
            />
          </InlineField>
          <InlineField label="Override Longitude" labelWidth={20}>
            <Input
              className="longitude"
              label="Longitude"
              onChange={this.onLongitudeChange}
              value={query.longitude}
              placeholder={datasource.longitude!.toString()}
              width={32}
            />
          </InlineField>
        </div>
      </div>
    );
  }
}
