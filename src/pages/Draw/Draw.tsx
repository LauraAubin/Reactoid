import * as React from 'react';

import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { Animations } from '../../animations/animations';
import { PURPLE, YELLOW } from '../../globalStyles/themeColors';
import { canvasElement } from '../../utilities/types';

import autobind from 'autobind-decorator';
import Canvas from '../../components/Canvas';
import Toggle from '../../components/Toggle';
import Card from '../../components/Card';
import Stack from '../../components/Stack';

interface State {
  canvasData: canvasElement[][];
  toggle: boolean;
  undo: number;
  disableUndo: boolean;
}

export default class Draw extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = {
      canvasData: [],
      toggle: false,
      undo: 0,
      disableUndo: true
    };
  }

  componentDidUpdate() {
    const { canvasData, disableUndo } = this.state;

    const checkForEmptyArray = canvasData.length == 0;

    if (disableUndo !== checkForEmptyArray) {
      this.setState({ disableUndo: checkForEmptyArray });
    }
  }

  public render() {
    const { toggle, undo, disableUndo } = this.state;

    return (
      <div className={css(Animations.growFromBottomLeft)}>
        <Card>
          <Card.Section subdued>
            <Stack distribution='trailing' alignment='center'>
              <Toggle onChange={this.toggle} />
            </Stack>
          </Card.Section>

          <Card.Section noPadding>
            <Stack distribution='center'>
              <Canvas
                width={920}
                height={500}
                lineColor={YELLOW}
                backgroundColor={PURPLE}
                setCanvasData={this.setCanvasData}
                toggle={toggle}
                undo={undo}
              />
            </Stack>
          </Card.Section>

          <button onClick={this.undo} disabled={disableUndo}>
            Undo
          </button>
          <Link to='/'>Home</Link>
          <br />
          <Link to='/view/'>View</Link>
        </Card>
      </div>
    );
  }

  @autobind
  setCanvasData(canvasData: canvasElement[][]) {
    this.setState({ canvasData });
  }

  @autobind
  toggle() {
    const { toggle } = this.state;

    this.setState({
      toggle: !toggle
    });
  }

  @autobind
  undo() {
    const { undo } = this.state;

    this.setState({ undo: undo + 1 });
  }
}
