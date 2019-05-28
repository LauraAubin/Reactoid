import { coordinate } from '../types/types';

export function isOutline(dataSet: coordinate[]) {
  return endsWhereItStarts(dataSet, 5);
}

export function endsWhereItStarts(dataSet: coordinate[], buffer: number) {
  const { offsetX: initialX, offsetY: initialY } = dataSet[0];

  const lastElement = dataSet.length - 1;
  const { offsetX: finalX, offsetY: finalY } = dataSet[lastElement];

  return (
    isBetween(initialX, finalX, buffer) && isBetween(initialY, finalY, buffer)
  );
}

export function isBetween(i: number, constant: number, modifier: number) {
  return constant - modifier <= i && i <= constant + modifier;
}
