import { coordinate } from '../types/types';

export function createCompleteOutline(
  dataSetOriginal: coordinate[],
  buildDataSetOriginal: coordinate[],
  acceptableDifference: number = 1
): coordinate[] {
  const dataSet = deepCopy(dataSetOriginal);
  const buildDataSet = deepCopy(buildDataSetOriginal);

  if (dataSet.length <= 0) return buildDataSet;

  if (dataSet.length == 1) { // last element
    buildDataSet.push(dataSet[0]);

    return connectEndToStart(dataSet, buildDataSet);
  }

  const { offsetX: firstX, offsetY: firstY } = dataSet[0];
  const { offsetX: secondX, offsetY: secondY } = dataSet[1];

  const dataPairDifferenceX = Math.abs(firstX - secondX);
  const dataPairDifferenceY = Math.abs(firstY - secondY);

  transitionDataSet(dataSet, buildDataSet);

  const isBreakpoint =
    dataPairDifferenceX > acceptableDifference ||
    dataPairDifferenceY > acceptableDifference;

  if (isBreakpoint)
    dataPairDifferenceX > dataPairDifferenceY
      ? addNewElementToBeginning(
          dataSet,
          firstX + 1,
          roundUp(average([firstY, secondY]))
        )
      : addNewElementToBeginning(
          dataSet,
          roundUp(average([firstX, secondX])),
          firstY + 1
        );

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

function connectEndToStart(dataSet: coordinate[], buildDataSet: coordinate[]) {
  const { offsetX: startX, offsetY: startY } = buildDataSet[0];
  const { offsetX: endX, offsetY: endY } = dataSet[0];

  const differenceX = Math.abs(endX - startX);
  const differenceY = Math.abs(endY - startY);
  const largestDifference = Math.max(differenceX, differenceY);

  if (largestDifference == 0) return buildDataSet;

  const loopTimes = largestDifference - 1;

  [...Array(loopTimes).keys()].forEach(() => {
    const determineOffsetDirection = (
      start: number,
      end: number,
      offset: number
    ) => (start > end ? offset + 1 : offset - 1);

    const determineNextOffset = (
      difference: number,
      nextOffsetValue: number,
      startValue: number
    ) => (difference == largestDifference ? nextOffsetValue : startValue);

    const toAdd = {
      offsetX: determineNextOffset(
        differenceX,
        determineOffsetDirection(startX, endX, last(buildDataSet).offsetX),
        startX
      ),
      offsetY: determineNextOffset(
        differenceY,
        determineOffsetDirection(startY, endY, last(buildDataSet).offsetY),
        startY
      )
    };

    addToEnd(buildDataSet, toAdd);
  });

  return buildDataSet;
}

function dropFirstElement(array: coordinate[]) {
  array.shift();
}

function addToEnd(array: coordinate[], toAdd: coordinate) {
  array.push(toAdd);
}

function last(array: coordinate[]) {
  return array[array.length - 1];
}

function roundUp(number: number) {
  return Math.ceil(number);
}

function roundDown(number: number) {
  return Math.floor(number);
}

export function average(numbers: number[]) {
  return sum(numbers) / 2;
}

export function sum(numbers: number[]) {
  let sum = 0;
  numbers.map(x => (sum += x));

  return sum;
}

function deepCopy(array: coordinate[]) {
  return JSON.parse(JSON.stringify(array));;
}
