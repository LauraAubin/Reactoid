import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Canvas from '../Canvas';

Enzyme.configure({ adapter: new Adapter() });

describe('Canvas', () => {
  const defaultProps = {
    width: 0,
    height: 0,
    lineColor: '',
    backgroundColor: ''
  };

  afterEach(() => {
    const wrapper = mount(<Canvas {...defaultProps} />);
    wrapper.unmount();
  });

  it('should render', () => {
    window.HTMLCanvasElement.prototype.getContext = () => true;
    mount(<Canvas {...defaultProps} />);
  });

  it('renders with props', () => {
    const props = {
      width: 50,
      height: 100,
      lineColor: 'blue',
      backgroundColor: 'yellow'
    };

    const wrapper = mount(<Canvas {...props} />);

    expect(wrapper.props()).toEqual(props);
  });
});
