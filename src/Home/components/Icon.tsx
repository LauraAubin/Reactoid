import * as React from 'react';

import { getIcon } from './get-icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  name: 'book' | 'penguin';
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

interface State {
  type?: 'fas' | 'fab'; // Icon prefix for fontAwesome solid and brand
}

export default class Icon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { type: undefined };
  }

  public render() {
    const { name = 'book', color } = this.props;
    const { type } = this.state;

    library.add(getIcon(name));

    return (
      <FontAwesomeIcon
        icon={[type as any, this.translateIconName()]}
        size={this.iconSize()}
        color={color}
      />
    );
  }

  private translateIconName() {
    const { name } = this.props;
    const { type } = this.state;

    const typeNotSetYet = !type;

    if (name == 'book') {
      typeNotSetYet && this.setSolidType();
      return 'book' as any;
    }

    if (name == 'penguin') {
      typeNotSetYet && this.setBrandType();
      return 'qq' as any;
    }
  }

  private setSolidType() {
    this.setState({ type: 'fas' });
  }

  private setBrandType() {
    this.setState({ type: 'fab' });
  }

  private iconSize() {
    const { size = 'small' } = this.props;

    if (size == 'small') {
      return '2x';
    } else if (size == 'medium') {
      return '5x';
    } else if (size == 'large') {
      return '10x';
    }
  }
}
