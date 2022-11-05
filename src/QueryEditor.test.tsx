import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { select } from 'react-select-event';
import { QueryEditor } from './QueryEditor';

describe('QueryEditor', () => {
  let props: any;

  beforeEach(() => {
    props = {
      query: {
        refId: 'test',
        target: 'sun_altitude',
        latitude: '',
        longitude: '',
      },
      datasource: {
        latitude: 50,
        longitude: 10,
      },
    };
  });

  it('should render without throwing an error', () => {
    expect(() => render(<QueryEditor {...props} />)).not.toThrow();
  });

  it('should update query on change', async () => {
    const onChange = jest.fn();
    const onRunQuery = jest.fn();
    render(<QueryEditor {...props} onChange={onChange} onRunQuery={onRunQuery} />);

    const metricSelect = await screen.findByLabelText('Metric');
    expect(metricSelect).toBeInTheDocument();
    await select(metricSelect, 'Moon altitude', { container: document.body });
    expect(onChange).toHaveBeenCalledWith({ ...props.query, target: 'moon_altitude' });
    expect(onRunQuery).toHaveBeenCalled();

    const latitudeInput = await screen.findByLabelText('Latitude');
    fireEvent.change(latitudeInput, { target: { value: '50' } });
    expect(onChange).toHaveBeenCalledWith({ ...props.query, latitude: '50' });
    expect(onRunQuery).toHaveBeenCalled();

    const longitudeInput = await screen.findByLabelText('Longitude');
    fireEvent.change(longitudeInput, { target: { value: '20' } });
    expect(onChange).toHaveBeenCalledWith({ ...props.query, longitude: '20' });
    expect(onRunQuery).toHaveBeenCalled();
  });
});
