import * as React from 'react';

import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { Animations } from '../../animations/animations';
import { PURPLE, YELLOW } from '../../globalStyles/colors';
import { coordinate } from 'src/components/Canvas/types/types';

import autobind from 'autobind-decorator';
import Canvas from '../../components/Canvas';
import Toggle from '../../components/Toggle';

interface State {
  outline: coordinate[];
  toggleOutline: boolean;
}

export default class Draw extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { outline: [], toggleOutline: false };
  }

  public render() {
    return (
      <div className={css(Animations.growFromBottomLeft)}>
        <Canvas
          width={1000}
          height={500}
          lineColor={YELLOW}
          backgroundColor={PURPLE}
          setOutline={this.setOutline}
        />
        <Toggle onChange={this.toggleOutline} />
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

  @autobind
  toggleOutline() {
    const { toggleOutline } = this.state;

    this.setState({ toggleOutline: !toggleOutline });
  }
}
