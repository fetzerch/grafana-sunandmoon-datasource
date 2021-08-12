import React, { ChangeEvent, PureComponent } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { SunAndMoonDataSourceOptions } from './types';
import {} from '@emotion/core';

export interface Props extends DataSourcePluginOptionsEditorProps<SunAndMoonDataSourceOptions> {}

export class ConfigEditor extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.fillPositionFromGeoLocation();
  }

  fillPositionFromGeoLocation = () => {
    const { options } = this.props;
    const { jsonData } = options;
    if (jsonData.latitude === undefined && jsonData.longitude === undefined) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { onOptionsChange, options } = this.props;
          const jsonData = {
            ...options.jsonData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          onOptionsChange({ ...options, jsonData });
        });
      }
    }
  };

  onLatitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      latitude: isNaN(value) ? undefined : value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onLongitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      longitude: isNaN(value) ? undefined : value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  render() {
    const { options } = this.props;
    const { jsonData } = options;

    return (
      <div className="gf-form-group">
        <h3 className="page-heading">Sun and Moon reference location</h3>
        <div className="grafana-info-box">
          This datasource calculates sun and moon metrics that are relative to a location on earth.
          <br />
          The geographic position is expressed as latitude and longitude in decimal degrees.
        </div>
        <div className="gf-form">
          <InlineField label="Latitude" labelWidth={14}>
            <Input
              className="latitude"
              label="Latitude"
              onChange={this.onLatitudeChange}
              value={jsonData.latitude}
              placeholder="48.3984"
              type="number"
              min={-90}
              max={90}
              required
              width={32}
            />
          </InlineField>
        </div>
        <div className="gf-form">
          <InlineField label="Longitude" labelWidth={14}>
            <Input
              className="longitude"
              label="Longitude"
              onChange={this.onLongitudeChange}
              value={jsonData.longitude}
              placeholder="9.9910"
              type="number"
              min={-360}
              max={360}
              required
              width={32}
            />
          </InlineField>
        </div>
      </div>
    );
  }
}
