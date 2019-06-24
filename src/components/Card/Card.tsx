import * as React from 'react';

import Section from './Section';

import './Card.scss';

interface Props {
  /* Allows you to customize which corners receive a border-radius.
  This can be useful for when a card is placed next to another item and the curved corner is not needed. */
  openEdges?: ('top' | 'right' | 'bottom' | 'left')[];
  children: any;
}

export default class Card extends React.Component<Props, any> {
  // Allows 'Card' to have a 'Section' property
  static Section = Section;

  public render() {
    const { children } = this.props;

    return (
      <div className='Card' style={this.corners()}>
        {children}
      </div>
    );
  }

  private corners() {
    const { openEdges } = this.props;

    const extraTight = '4px';

    const topCorners = {
      borderTopLeftRadius: extraTight,
      borderTopRightRadius: extraTight
    };

    const rightCorners = {
      borderTopRightRadius: extraTight,
      borderBottomRightRadius: extraTight
    };

    const bottomCorners = {
      borderBottomLeftRadius: extraTight,
      borderBottomRightRadius: extraTight
    };

    const leftCorners = {
      borderTopLeftRadius: extraTight,
      borderBottomLeftRadius: extraTight
    };

    if (openEdges) {
      const arrayOfStyles = openEdges.map(i => {
        if (i == 'top') return topCorners;
        if (i == 'right') return rightCorners;
        if (i == 'bottom') return bottomCorners;
        if (i == 'left') return leftCorners;
      });

      let reduced = { borderRadius: 0 };
      for (let i = 0; i < arrayOfStyles.length; i++) {
        reduced = { ...reduced, ...arrayOfStyles[i] };
      }

      return reduced;
    }
  }
}
