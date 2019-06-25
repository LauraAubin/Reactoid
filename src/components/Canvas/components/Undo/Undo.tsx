import * as React from 'react';

import Icon from '../../../../components/Icon';

interface Props {
  undo(): void;
  disableUndo: boolean;
}

interface State {
  color: string;
}

const BASE_COLOR = '#ffe787';
const PRESSED_COLOR = '#362b72';
const DISABLED_COLOR = '#4f4396';

export default class Undo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { disableUndo } = this.props;

    this.state = {
      color: disableUndo ? DISABLED_COLOR : BASE_COLOR
    };
  }

  componentDidUpdate(preProps: Props) {
    const { disableUndo } = this.props;

    if (preProps.disableUndo !== disableUndo) {
      disableUndo
        ? this.changeColor(DISABLED_COLOR)
        : this.changeColor(BASE_COLOR);
    }
  }

  public render() {
    const { color } = this.state;

    return (
      <div
        className='Undo'
        onMouseDown={() => this.onMouseDown()}
        onMouseUp={() => this.onClick()}
        onMouseLeave={() => this.onMouseLeave()}
      >
        <Icon name='undo' color={color} />
      </div>
    );
  }

  changeColor(color: string) {
    this.setState({ color });
  }

  onMouseDown() {
    const { disableUndo } = this.props;

    if (!disableUndo) {
      this.changeColor(PRESSED_COLOR);
    }
  }

  onClick() {
    const { undo, disableUndo } = this.props;

    if (!disableUndo) {
      undo();
      this.changeColor(BASE_COLOR);
    }
  }

  onMouseLeave() {
    const { disableUndo } = this.props;

    if (!disableUndo) {
      this.changeColor(BASE_COLOR);
    }
  }
}
