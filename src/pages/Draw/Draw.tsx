import * as React from 'react';

import { css } from 'aphrodite';
import { Button } from '@shopify/polaris';
import { Animations } from '../../animations/animations';
import { canvasElement, canvasTools } from '../../utilities/types';

import autobind from 'autobind-decorator';
import Grid from '../../components/Grid';
import Stack from '../../components/Stack';
import BackModal from './components/BackModal';
import Footer from './components/Footer';
import CanvasContainer from './components/CanvasContainer';
import Tools from './components/Tools';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

interface State {
  canvasData: canvasElement[][];
  modalActive: boolean;
  tool: canvasTools;
}

export default class Draw extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = {
      canvasData: [],
      modalActive: false,
      tool: 'body'
    };
  }

  public render() {
    const { modalActive, tool } = this.state;

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
              <Tools tool={tool} currentCanvasTool={this.currentCanvasTool} />
            </Grid.Section>

            <Grid.Section
              spanColumns={{ start: 2, end: 3 }}
              spanRows={{ start: 1, end: 2 }}
            >
              <CanvasContainer
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                setCanvasData={this.setCanvasData}
              />
            </Grid.Section>

            <Grid.Section
              spanColumns={{ start: 2, end: 3 }}
              spanRows={{ start: 2, end: 3 }}
            >
              <Footer />
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
  handleModal() {
    const { modalActive } = this.state;

    this.setState({ modalActive: !modalActive });
  }

  @autobind
  currentCanvasTool(tool: canvasTools) {
    this.setState({ tool });
  }
}
