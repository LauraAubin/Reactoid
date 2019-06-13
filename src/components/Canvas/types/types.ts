export type coordinate = {
  offsetX: number;
  offsetY: number;
};

export type canvasTypes =  'drawn' | 'generated';

export interface buildCoordinates extends coordinate {
  type: canvasTypes;
}
