import * as React from 'react';

import { coordinate, canvasTypes } from './types/types';
import {
  createCompleteOutline,
  onlyGeneratedCoodinates
} from './Dataset_utils/Dataset_utils';
import { interval } from '../../utilities/math';

import autobind from 'autobind-decorator';
import Dot from './Dot';

import './Canvas.scss';

const DOT_INTERVAL = 15;

interface Props {
  width: number;
  height: number;
  lineColor: string;
  backgroundColor: string;
  setOutline?(setOutline: coordinate[]): void;
}

interface State {
  isPainting: boolean;
  canvas: any;
  canvasContext: any;
  previousCoordinate: coordinate;
  lineData: coordinate[];
  outlineData: coordinate[];
}

export default class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isPainting: false,
      canvas: undefined,
      canvasContext: undefined,
      previousCoordinate: { offsetX: 0, offsetY: 0, type: 'generated' },
      lineData: [],
      outlineData: []
    };
  }

  componentDidMount() {
    this.setState({ canvas: document.getElementById('canvas') });
  }

  componentDidUpdate() {
    const { width, height } = this.props;
    const { canvas, canvasContext } = this.state;

    if (canvas && !canvasContext) {
      canvas.width = width;
      canvas.height = height;

      this.setState({ canvasContext: canvas.getContext('2d') });
    }

    if (canvasContext && canvasContext.lineWidth == 1) {
      this.setupCanvasProperties();
    }
  }

  setupCanvasProperties() {
    const { canvasContext } = this.state;

    canvasContext.lineJoin = 'round';
    canvasContext.lineCap = 'round';
    canvasContext.lineWidth = 5;
  }

  render() {
    const { backgroundColor } = this.props;

    return (
      <canvas
        id='canvas'
        style={{ background: backgroundColor }}
        className='Canvas'
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
    );
  }

  @autobind
  onMouseDown({ nativeEvent }: any) {
    const { offsetX, offsetY } = nativeEvent;

    this.setState({
      isPainting: true,
      previousCoordinate: { offsetX, offsetY, type: 'beginDraw' }
    });
  }

  @autobind
  onMouseMove({ nativeEvent }: any) {
    const { isPainting, previousCoordinate } = this.state;

    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const currentCoordinate = {
        offsetX,
        offsetY,
        type: 'drawn' as canvasTypes
      };

      this.addNewLineData();
      this.paint(previousCoordinate, currentCoordinate);
    }
  }

  @autobind
  endPaintEvent() {
    const { isPainting } = this.state;

    // TODO - calculate completeOutline when launching the view page
    if (isPainting) {
      this.setEndDraw().then(() =>
        this.completeOutline().then(() => this.togglepainting())
      );
    }
  }

  addNewLineData() {
    const { previousCoordinate, lineData } = this.state;

    this.setState({ lineData: lineData.concat({ ...previousCoordinate }) });
  }

  @autobind
  paint(previousCoordinate: coordinate, currentCoordinate: coordinate) {
    const { canvas } = this.state;
    const { offsetX: currentX, offsetY: currentY } = currentCoordinate;

    if (canvas) {
      this.drawLineSegment(previousCoordinate, currentCoordinate);

      this.setState({
        previousCoordinate: {
          offsetX: currentX,
          offsetY: currentY,
          type: 'drawn'
        }
      });
    }
  }

  drawLineSegment(
    previousCoordinate: coordinate,
    currentCoordinate: coordinate
  ) {
    const { lineColor } = this.props;
    const { canvasContext } = this.state;
    const { offsetX: previousX, offsetY: previousY } = previousCoordinate;
    const { offsetX: currentX, offsetY: currentY } = currentCoordinate;

    canvasContext.beginPath();

    this.startPathAt(previousX, previousY);
    this.endPathAt(currentX, currentY);

    canvasContext.strokeStyle = lineColor;
    canvasContext.stroke();
  }

  startPathAt(x: number, y: number) {
    const { canvasContext } = this.state;

    canvasContext.moveTo(x, y);
  }

  endPathAt(x: number, y: number) {
    const { canvasContext } = this.state;

    canvasContext.lineTo(x, y);
  }

  togglepainting() {
    const { isPainting } = this.state;

    this.setState({ isPainting: !isPainting });
  }

  @autobind
  async setEndDraw() {
    const { previousCoordinate } = this.state;
    const { offsetX, offsetY } = previousCoordinate;

    this.setState(
      {
        previousCoordinate: { offsetX, offsetY, type: 'endDraw' }
      },
      () => this.addNewLineData()
    );
  }

  @autobind
  async completeOutline() {
    const { setOutline } = this.props;
    const { lineData } = this.state;

    const outline = createCompleteOutline(lineData);

    this.setState({ outlineData: outline });

    onlyGeneratedCoodinates(outline).map(
      ({ offsetX, offsetY }, index) =>
        interval(index, DOT_INTERVAL) && this.drawDot(offsetX, offsetY)
    );

    setOutline && setOutline(outline);
  }

  drawDot(x: number, y: number) {
    const { canvasContext } = this.state;

    Dot({
      canvasContext,
      x: x,
      y: y,
      size: 2,
      glowSize: 3
    });
  }
}
