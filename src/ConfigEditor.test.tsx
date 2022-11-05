import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { ConfigEditor } from './ConfigEditor';

describe('ConfigEditor', () => {
  let props: any;

  beforeEach(() => {
    props = {
      options: {
        jsonData: {
          latitude: 48,
          longitude: 10,
        },
      },
      onOptionsChange: {},
    };
  });

  it('should render without throwing an error', () => {
    expect(() => render(<ConfigEditor {...props} />)).not.toThrow();
  });

  it('should initially set latitude and longitude from geolocation', () => {
    const onOptionsChange = jest.fn();
    const options: any = {
      jsonData: {}
    };
    render(<ConfigEditor {...props} onOptionsChange={onOptionsChange} options={options} />);
    expect(onOptionsChange).not.toHaveBeenCalled();

    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 40,
              longitude: 5,
            },
          })
        )
      ),
      clearWatch: jest.fn(),
      watchPosition: jest.fn(),
    };
    Object.defineProperty(global.navigator, 'geolocation', { value: mockGeolocation });
    render(<ConfigEditor {...props} onOptionsChange={onOptionsChange} options={options} />);
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: 40, longitude: 5 } });
  });

  it('should update latitude and longitude on change', () => {
    const onOptionsChange = jest.fn();
    render(<ConfigEditor {...props} onOptionsChange={onOptionsChange} />);
    const latitudeField = screen.getByLabelText('Latitude');
    const longitudeField = screen.getByLabelText('Longitude');

    fireEvent.change(latitudeField, { target: { value: 50 } });
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: 50, longitude: 10 } });
    fireEvent.change(longitudeField, { target: { value: 20 } });
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: 48, longitude: 20 } });
    fireEvent.change(latitudeField, { target: { value: '' } });
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: undefined, longitude: 10 } });
    fireEvent.change(longitudeField, { target: { value: '' } });
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: 48, longitude: undefined } });
  });
});
