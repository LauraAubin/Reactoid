import * as React from 'react';

import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { Button } from '@shopify/polaris';
import { Animations } from '../../animations/animations';
import { PURPLE, YELLOW } from '../../utilities/styles/themeColors';
import { canvasElement } from '../../utilities/types';

import autobind from 'autobind-decorator';
import Canvas from '../../components/Canvas';
import Card from '../../components/Card';
import Grid from '../../components/Grid';
import Stack from '../../components/Stack';
import BackModal from './components/BackModal';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

interface State {
  canvasData: canvasElement[][];
  toggle: boolean;
  undo: number;
  disableUndo: boolean;
  modalActive: boolean;
}

export default class Draw extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = {
      canvasData: [],
      toggle: false,
      undo: 0,
      disableUndo: true,
      modalActive: false
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
    const { toggle, undo, disableUndo, modalActive } = this.state;

    return (
      <div className={css(Animations.slideInFromBottom)}>
        <BackModal modalActive={modalActive} handleModal={this.handleModal} />

        <Stack vertical>
          <Button plain icon='chevronLeft' onClick={this.handleModal}>
            Back
          </Button>

          <Grid
            columns={`1fr ${CANVAS_WIDTH}px`}
            rows={`${CANVAS_HEIGHT}px 1fr`}
          >
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
                  <Stack spacing='none' distribution='center'>
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
                  <Stack spacing='none' distribution='center'>
                    <button onClick={this.undo} disabled={disableUndo}>
                      Undo
                    </button>
                    <Link to='/view/'>View</Link>
                  </Stack>
                </Card.Section>
              </Card>
            </Grid.Section>
          </Grid>
        </Stack>
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

  @autobind
  handleModal() {
    const { modalActive } = this.state;

    this.setState({ modalActive: !modalActive });
  }
}
