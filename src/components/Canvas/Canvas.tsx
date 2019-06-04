import * as React from 'react';

import autobind from 'autobind-decorator';
import { coordinate } from './types/types';

import './Canvas.scss';

interface Props {
  width: number;
  height: number;
  lineColor: string;
  backgroundColor: string;
}

interface State {
  isPainting: boolean;
  canvas: any;
  canvasContext: any;
  previousCoordinate: coordinate;
  lineData: coordinate[];
}

export default class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isPainting: false,
      canvas: undefined,
      canvasContext: undefined,
      previousCoordinate: { offsetX: 0, offsetY: 0 },
      lineData: []
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
      previousCoordinate: { offsetX, offsetY }
    });
  }

  @autobind
  onMouseMove({ nativeEvent }: any) {
    const { isPainting, previousCoordinate } = this.state;

    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const currentCoordinate = { offsetX, offsetY };

      this.addNewLineData();
      this.paint(previousCoordinate, currentCoordinate);
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
        previousCoordinate: { offsetX: currentX, offsetY: currentY }
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

  @autobind
  endPaintEvent() {
    const { isPainting } = this.state;

    isPainting && this.togglepainting();
  }

  togglepainting() {
    const { isPainting } = this.state;

    this.setState({ isPainting: !isPainting });
  }
}
