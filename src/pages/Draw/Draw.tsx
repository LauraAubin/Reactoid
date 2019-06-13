import * as React from 'react';

import autobind from 'autobind-decorator';
import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { Animations } from '../../animations/animations';
import { PURPLE, YELLOW } from '../../globalStyles/colors';
import { coordinate } from 'src/components/Canvas/types/types';

import Canvas from '../../components/Canvas';

interface State {
  outline: coordinate[];
}

export default class Draw extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { outline: [] };
  }

  public render() {
    return (
      <div className={css(Animations.growFromBottomLeft)}>
        <Canvas
          width={1000}
          height={500}
          lineColor={YELLOW}
          backgroundColor={PURPLE}
          outline={this.setOutline}
        />
        <br />
        <Link to='/'>Home</Link>
        <br />
        <Link to='/view/'>View</Link>
      </div>
    );
  }

  @autobind
  setOutline(outline: coordinate[]) {
    this.setState({ outline });
  }
}
