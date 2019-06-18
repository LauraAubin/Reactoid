import * as React from 'react';

import autobind from 'autobind-decorator';

import './Toggle.scss';

interface Props {
  onChange(): void;
}

interface State {
  isChecked: any;
}

export default class Toggle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isChecked: false };
  }

  @autobind
  public handleChange() {
    const { onChange } = this.props;
    const { isChecked } = this.state;

    onChange();
    this.setState({ isChecked: !isChecked });
  }

  public render() {
    const { isChecked } = this.state;

    return (
      <label className='Switch'>
        <input
          type='Checkbox'
          className='Checkbox'
          value={isChecked}
          onChange={this.handleChange}
        />
        <div className='Slider' />
      </label>
    );
  }
}
