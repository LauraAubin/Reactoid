import { coordinate } from '../types/types';

export function createCompleteOutline(
  dataSetOriginal: coordinate[],
  buildDataSetOriginal: coordinate[],
  acceptableDifference: number = 1
): coordinate[] {
  const dataSet = deepCopy(dataSetOriginal);
  const buildDataSet = deepCopy(buildDataSetOriginal);

  if (dataSet.length <= 0) return buildDataSet;

  dataSet.forEach((element: coordinate, index: number) => {
    if (index == dataSet.length - 1) {
      // last element
      buildDataSet.push(dataSet[index]);

      return connectEndToStart(buildDataSet);
    }

    const { offsetX: firstX, offsetY: firstY } = element;
    const { offsetX: secondX, offsetY: secondY } = dataSet[index + 1];

    const dataPairDifferenceX = Math.abs(firstX - secondX);
    const dataPairDifferenceY = Math.abs(firstY - secondY);

    const isBreakpoint =
      dataPairDifferenceX > acceptableDifference ||
      dataPairDifferenceY > acceptableDifference;

    transitionDataSet(buildDataSet, element);

    if (isBreakpoint) {
      const largestDifference = Math.max(
        dataPairDifferenceX,
        dataPairDifferenceY
      );
      const loopTimes = largestDifference - 1;

      [...Array(loopTimes).keys()].forEach(index => {
        const determineIndexDirection = (
          start: number,
          end: number,
          modifier: number = start
        ) => (start < end ? modifier + index : modifier - index);

        const determineOffsetDirection = (start: number, end: number) =>
          start < end
            ? determineIndexDirection(start, end) + 1
            : determineIndexDirection(start, end) - 1;

        dataPairDifferenceX > dataPairDifferenceY
          ? addToEnd(buildDataSet, {
              offsetX: determineOffsetDirection(firstX, secondX),
              offsetY: roundUp(
                average([
                  determineIndexDirection(firstY, secondY),
                  determineIndexDirection(firstY, secondY, secondY)
                ])
              )
            })
          : addToEnd(buildDataSet, {
              offsetX: roundUp(
                average([
                  determineIndexDirection(firstX, secondX),
                  determineIndexDirection(firstX, secondX, secondX)
                ])
              ),
              offsetY: determineOffsetDirection(firstY, secondY)
            });
      });
    }
  });

  return buildDataSet;
}

function transitionDataSet(buildDataSet: coordinate[], toAdd: coordinate) {
  addToEnd(buildDataSet, toAdd);
}

function connectEndToStart(buildDataSet: coordinate[]) {
  const { offsetX: startX, offsetY: startY } = buildDataSet[0];
  const { offsetX: endX, offsetY: endY } = last(buildDataSet);

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
  return JSON.parse(JSON.stringify(array));
}
