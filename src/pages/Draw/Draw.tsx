import * as React from 'react';

import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { Animations } from '../../animations/animations';
import { PURPLE, YELLOW } from '../../globalStyles/colors';

import Canvas from '../../components/Canvas';

export default class Draw extends React.Component {
  public render() {
    return (
      <div className={css(Animations.growFromBottomLeft)}>
        <Canvas
          width={1000}
          height={500}
          lineColor={YELLOW}
          backgroundColor={PURPLE}
        />
        <br />
        <Link to='/'>Home</Link>
      </div>
    );
  }
}
