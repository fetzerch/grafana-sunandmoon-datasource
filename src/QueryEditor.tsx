import defaults from 'lodash/defaults';
import map from 'lodash/map';

import React, { ChangeEvent, PureComponent } from 'react';
import { InlineFormLabel, InlineField, Input, MultiSelect } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { SunAndMoonDataSource } from './DataSource';
import { SunAndMoonDataSourceOptions, SunAndMoonQuery, sunAndMoonDefaultQuery, sunAndMoonMetrics, sunAndMoonAnnotations } from './types';
import { migrateQuery } from 'migrations';

export type Props = QueryEditorProps<SunAndMoonDataSource, SunAndMoonQuery, SunAndMoonDataSourceOptions>;

const metrics = map({ ...sunAndMoonMetrics, ...sunAndMoonAnnotations }, (metric, value) => {
  return { label: metric.title, value: value, description: metric.text };
}) as Array<SelectableValue<string>>;

export class QueryEditor extends PureComponent<Props> {
  onMetricChanged = (selected: Array<SelectableValue<string>>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, target: selected.map(selection => selection.value!) });
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
    migrateQuery(this.props.query);

    const query = defaults(this.props.query, sunAndMoonDefaultQuery);
    const { datasource } = this.props;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <InlineFormLabel htmlFor="Metric">Metric</InlineFormLabel>
          <MultiSelect
            className="metric"
            inputId="Metric"
            options={metrics}
            value={query!.target}
            onChange={this.onMetricChanged}
            placeholder="Metric"
          />
        </div>
        <div className="gf-form gf-form--grow">
          <InlineField label="Override Latitude" labelWidth={20}>
            <Input
              className="latitude"
              aria-label="Latitude"
              onChange={this.onLatitudeChange}
              value={query.latitude}
              placeholder={datasource.latitude!.toString()}
              width={32}
            />
          </InlineField>
          <InlineField label="Override Longitude" labelWidth={20}>
            <Input
              className="longitude"
              aria-label="Longitude"
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
