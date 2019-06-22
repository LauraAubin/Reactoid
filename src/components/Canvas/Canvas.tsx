import * as React from 'react';

import { canvasElement } from '../../utilities/types';
import { last } from '../../utilities/arrays';

import autobind from 'autobind-decorator';

import './Canvas.scss';

interface Props {
  width: number;
  height: number;
  lineColor: string;
  backgroundColor: string;
  toggle: boolean;
  undo: number;
  setCanvasData(canvasData: any[]): void;
}

interface State {
  isPainting: boolean;
  canvas: any;
  canvasContext: any;
  currentCanvasData: canvasElement[];
  canvasData: canvasElement[][];
}

export default class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isPainting: false,
      canvas: undefined,
      canvasContext: undefined,
      currentCanvasData: [],
      canvasData: []
    };
  }

  componentDidMount() {
    this.setState({ canvas: document.getElementById('canvas') });
  }

  componentDidUpdate(prevProps: Props) {
    const { width, height, undo } = this.props;
    const { canvas, canvasContext, canvasData } = this.state;

    if (canvas && !canvasContext) {
      canvas.width = width;
      canvas.height = height;

      this.setState({ canvasContext: canvas.getContext('2d') });
    }

    if (canvasContext && canvasContext.lineWidth == 1) {
      this.setupCanvasProperties();
    }

    if (prevProps.undo !== undo) {
      canvasData.pop();
      this.setState({ canvasData });

      this.clear();
      this.repaint();
    }
  }

  setupCanvasProperties() {
    const { canvasContext } = this.state;

    canvasContext.lineJoin = 'round';
    canvasContext.lineCap = 'round';
    canvasContext.lineWidth = 15;
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
  clear() {
    const { width, height } = this.props;
    const { canvasContext } = this.state;

    canvasContext.clearRect(0, 0, width, height);
  }

  @autobind
  repaint() {
    const { canvasData } = this.state;

    canvasData.map((arrayElement: canvasElement[]) => {
      arrayElement.map((element, index) => {
        if (index == 0) return;

        const previousElement = arrayElement[index - 1];

        this.paint(previousElement, element);
      });
    });
  }

  @autobind
  onMouseDown({ nativeEvent }: any) {
    const { currentCanvasData } = this.state;

    const { offsetX, offsetY } = nativeEvent;

    this.setState({
      isPainting: true,
      currentCanvasData: currentCanvasData.concat({ offsetX, offsetY })
    });
  }

  @autobind
  onMouseMove({ nativeEvent }: any) {
    const { isPainting, currentCanvasData } = this.state;

    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const currentCoordinate = {
        offsetX,
        offsetY
      };

      this.paint(last(currentCanvasData), currentCoordinate);

      const { offsetX: currentX, offsetY: currentY } = currentCoordinate;

      this.setState({
        currentCanvasData: currentCanvasData.concat({
          offsetX: currentX,
          offsetY: currentY
        })
      });
    }
  }

  @autobind
  endPaintEvent() {
    const { isPainting } = this.state;

    if (isPainting) {
      this.addNewLineData();
      this.togglepainting();
    }
  }

  addNewLineData() {
    const { setCanvasData } = this.props;
    const { currentCanvasData, canvasData } = this.state;

    this.setState(
      {
        canvasData: canvasData.concat([currentCanvasData]),
        currentCanvasData: []
      },
      () => setCanvasData && setCanvasData(this.state.canvasData)
    );
  }

  @autobind
  paint(previousCoordinate: canvasElement, currentCoordinate: canvasElement) {
    const { canvas } = this.state;

    if (canvas) {
      this.drawLineSegment(previousCoordinate, currentCoordinate);
    }
  }

  drawLineSegment(
    previousCoordinate: canvasElement,
    currentCoordinate: canvasElement
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
}
