import { coordinate } from '../types/types';

export function createCompleteOutline(
  dataSet: coordinate[],
  buildDataSet: coordinate[],
  acceptableDifference: number = 1
) {
  if (dataSet.length == 1) {
    buildDataSet.push(dataSet[0]);

    return buildDataSet;
  }

  const { offsetX: firstX, offsetY: firstY } = dataSet[0];
  const { offsetX: secondX, offsetY: secondY } = dataSet[1];

  const dataPairDifferenceX = Math.abs(firstX - secondX);
  const dataPairDifferenceY = Math.abs(firstY - secondY);

  const isBreakpointX = dataPairDifferenceX > acceptableDifference;
  const isBreakpointY = dataPairDifferenceY > acceptableDifference;

  transitionDataSet(dataSet, buildDataSet);

  isBreakpointX &&
    addNewElementToBeginning(dataSet, firstX + 1, average([firstY, secondY]));

  isBreakpointY &&
    addNewElementToBeginning(dataSet, average([firstX, secondX]), firstY + 1);

  return createCompleteOutline(dataSet, buildDataSet);
}

function transitionDataSet(dataSet: coordinate[], buildDataSet: coordinate[]) {
  addToEnd(buildDataSet, dataSet[0]);
  dropFirstElement(dataSet);
}

function addNewElementToBeginning(array: coordinate[], x: number, y: number) {
  array.unshift({
    offsetX: x,
    offsetY: y
  });
}

function dropFirstElement(array: coordinate[]) {
  array.shift();
}

function addToEnd(array: coordinate[], toAdd: coordinate) {
  array.push(toAdd);
}

export function average(numbers: number[]) {
  return sum(numbers) / 2;
}

export function sum(numbers: number[]) {
  let sum = 0;
  numbers.map(x => (sum += x));

  return sum;
}
