import React from 'react';
import { shallow } from 'enzyme';
import { QueryEditor } from './QueryEditor';

const setup = (propsOverrides?: object) => {
  const props: any = {
    query: {
      target: 'sun_altitude',
      latitude: '',
      longitude: '',
    },
    datasource: {
      latitude: 50,
      longitude: 10,
    },
  };

  Object.assign(props, propsOverrides);
  return shallow(<QueryEditor {...props} />);
};

describe('Render', () => {
  it('should render component', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('should update query on change', () => {
    const onChange = jest.fn();
    const onRunQuery = jest.fn();
    const wrapper = setup({ onChange: onChange, onRunQuery: onRunQuery });
    const { query } = (wrapper.instance() as QueryEditor).props;

    const metricSelect = wrapper.find('.metric');
    metricSelect.simulate('change', { value: 'moon_altitude' });
    expect(onChange).toHaveBeenCalledWith({ ...query, target: 'moon_altitude' });
    expect(onRunQuery).toHaveBeenCalled();

    const latitudeInput = wrapper.find('.latitude');
    latitudeInput.simulate('change', { target: { value: '50' } });
    expect(onChange).toHaveBeenCalledWith({ ...query, latitude: '50' });
    expect(onRunQuery).toHaveBeenCalled();

    const longitudeInput = wrapper.find('.longitude');
    longitudeInput.simulate('change', { target: { value: '20' } });
    expect(onChange).toHaveBeenCalledWith({ ...query, longitude: '20' });
    expect(onRunQuery).toHaveBeenCalled();
  });
});
