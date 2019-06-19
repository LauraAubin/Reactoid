import * as React from 'react';

import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { Animations } from '../../animations/animations';
import { PURPLE, YELLOW } from '../../globalStyles/colors';
import { canvasElement, toggleOptions } from '../../utilities/types';

import autobind from 'autobind-decorator';
import Canvas from '../../components/Canvas';
import Toggle from '../../components/Toggle';

interface State {
  canvasData: canvasElement[];
  toggleDrawing: toggleOptions;
}

export default class Draw extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { canvasData: [], toggleDrawing: toggleOptions.Edit };
  }

  public render() {
    const { toggleDrawing } = this.state;

    return (
      <div className={css(Animations.growFromBottomLeft)}>
        <Canvas
          width={1000}
          height={500}
          lineColor={YELLOW}
          backgroundColor={PURPLE}
          setCanvasData={this.setCanvasData}
          toggleDrawing={toggleDrawing}
        />
        Show result
        <Toggle onChange={this.toggle} />
        Back to drawing
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
    const { toggleDrawing } = this.state;

    this.setState({
      toggleDrawing:
        toggleDrawing == toggleOptions.Edit
          ? toggleOptions.View
          : toggleOptions.Edit
    });
  }
}
