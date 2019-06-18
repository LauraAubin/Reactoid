export type coordinate = {
  offsetX: number;
  offsetY: number;
  type: canvasTypes;
};

export type canvasTypes = 'beginDraw' | 'drawn' | 'endDraw' | 'generated';
