import React from 'react';
import { shallow } from 'enzyme';
import { QueryEditor } from './QueryEditor';

const setup = (propsOverrides?: object) => {
  const props: any = {
    query: {
      target: 'sun_altitude',
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

  it('should update target on change', () => {
    const onChange = jest.fn();
    const onRunQuery = jest.fn();
    const wrapper = setup({ onChange: onChange, onRunQuery: onRunQuery });
    const metricSelect = wrapper.find('.metric');

    metricSelect.simulate('change', { value: 'moon_altitude' });
    expect(onChange).toHaveBeenCalledWith({ target: 'moon_altitude' });
    expect(onRunQuery).toHaveBeenCalled();
  });
});
