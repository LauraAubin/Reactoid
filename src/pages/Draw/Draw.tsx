import * as React from 'react';

import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { Animations } from '../../animations/animations';
import { PURPLE, YELLOW } from '../../globalStyles/colors';
import { canvasElement } from 'src/components/Canvas/types/types';

import autobind from 'autobind-decorator';
import Canvas from '../../components/Canvas';
import Toggle from '../../components/Toggle';

interface State {
  canvasData: canvasElement[];
  toggle: boolean;
}

export default class Draw extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { canvasData: [], toggle: false };
  }

  public render() {
    return (
      <div className={css(Animations.growFromBottomLeft)}>
        <Canvas
          width={1000}
          height={500}
          lineColor={YELLOW}
          backgroundColor={PURPLE}
          setCanvasData={this.setCanvasData}
        />
        <Toggle onChange={this.toggle} />
        <br />
        <Link to='/'>Home</Link>
        <br />
        <Link to='/view/'>View</Link>
      </div>
    );
  }

  @autobind
  setCanvasData(canvasData: canvasElement[]) {
    this.setState({ canvasData });
  }

  @autobind
  toggle() {
    const { toggle } = this.state;

    this.setState({ toggle: !toggle });
  }
}
