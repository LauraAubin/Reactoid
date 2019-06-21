import * as React from 'react';

import Section from './Section';

import './Card.scss';

interface Props {
  children: any;
}

export default class Card extends React.Component<Props, any> {
  // Allows 'Card' to have a 'Section' property
  static Section = Section;

  public render() {
    const { children } = this.props;

    return <div className='Card'>{children}</div>;
  }
}
