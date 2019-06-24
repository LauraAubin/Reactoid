import * as React from 'react';

import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { Animations } from '../../animations/animations';
import { PURPLE, YELLOW } from '../../globalStyles/themeColors';
import { canvasElement } from '../../utilities/types';

import autobind from 'autobind-decorator';
import Canvas from '../../components/Canvas';
import Card from '../../components/Card';
import Grid from '../../components/Grid';
import Stack from '../../components/Stack';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

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
        <Grid columns={`1fr ${CANVAS_WIDTH}px`} rows={`${CANVAS_HEIGHT}px 1fr`}>
          <Grid.Section
            spanColumns={{ start: 1, end: 2 }}
            spanRows={{ start: 1, end: 2 }}
          >
            <Card openEdges={['left']}>
              <Card.Section>tools</Card.Section>
            </Card>
          </Grid.Section>

          <Grid.Section
            spanColumns={{ start: 2, end: 3 }}
            spanRows={{ start: 1, end: 2 }}
          >
            <Card>
              <Card.Section noPadding>
                <Stack distribution='center'>
                  <Canvas
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    lineColor={YELLOW}
                    backgroundColor={PURPLE}
                    setCanvasData={this.setCanvasData}
                    toggle={toggle}
                    undo={undo}
                  />
                </Stack>
              </Card.Section>
            </Card>
          </Grid.Section>

          <Grid.Section
            spanColumns={{ start: 2, end: 3 }}
            spanRows={{ start: 2, end: 3 }}
          >
            <Card openEdges={['bottom']}>
              <Card.Section>
                <Stack distribution='center'>
                  <button onClick={this.undo} disabled={disableUndo}>
                    Undo
                  </button>
                  <Link to='/'>Home</Link>
                  <br />
                  <Link to='/view/'>View</Link>
                </Stack>
              </Card.Section>
            </Card>
          </Grid.Section>
        </Grid>
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
