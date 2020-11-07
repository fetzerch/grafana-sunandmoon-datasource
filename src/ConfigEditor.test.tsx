import React from 'react';
import { shallow } from 'enzyme';
import { ConfigEditor } from './ConfigEditor';

const setup = (propsOverrides?: object) => {
  const props: any = {
    options: {
      jsonData: {
        latitude: 48,
        longitude: 10,
      },
    },
    onOptionsChange: jest.fn(),
  };

  Object.assign(props, propsOverrides);
  return shallow(<ConfigEditor {...props} />);
};

describe('Render', () => {
  it('should render component', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('should initially set latitude and longitude from geolocation', () => {
    const onOptionsChange = jest.fn();
    setup({ onOptionsChange: onOptionsChange, options: { jsonData: {} } });
    expect(onOptionsChange).not.toHaveBeenCalled();

    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce(success =>
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
    setup({ onOptionsChange: onOptionsChange, options: { jsonData: {} } });
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: 40, longitude: 5 } });
  });

  it('should update latitude and longitude on change', () => {
    const onOptionsChange = jest.fn();
    const wrapper = setup({ onOptionsChange: onOptionsChange });
    const latitudeField = wrapper.find('.latitude');
    const longitudeField = wrapper.find('.longitude');

    latitudeField.simulate('change', { target: { value: 50 } });
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: 50, longitude: 10 } });
    longitudeField.simulate('change', { target: { value: 20 } });
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: 48, longitude: 20 } });
    latitudeField.simulate('change', { target: { value: '' } });
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: undefined, longitude: 10 } });
    longitudeField.simulate('change', { target: { value: '' } });
    expect(onOptionsChange).toHaveBeenLastCalledWith({ jsonData: { latitude: 48, longitude: undefined } });
  });
});
