// LEGACY
// This code isn't being used and only existed to experiment with

import { addToEnd, last, deepCopy } from '../../../utilities/arrays';
import { average, roundUp } from '../../../utilities/math';

export type canvasTypes = 'beginDraw' | 'drawn' | 'endDraw' | 'generated';
type coordinate = { offsetX: number; offsetY: number; type: canvasTypes };

export function createCompleteOutline(
  dataSet: coordinate[],
  acceptableDifference: number = 1
): coordinate[] {
  let buildDataSet: coordinate[] = [];

  if (dataSet.length <= 0) return buildDataSet;

  dataSet.forEach((element: coordinate, index: number) => {
    if (index == dataSet.length - 1) {
      // last element
      buildDataSet.push({ ...dataSet[index] });

      return connectEndToStart(buildDataSet);
    }

    const { offsetX: firstX, offsetY: firstY } = element;
    const { offsetX: secondX, offsetY: secondY } = dataSet[index + 1];

    const dataPairDifferenceX = Math.abs(firstX - secondX);
    const dataPairDifferenceY = Math.abs(firstY - secondY);

    const isBreakpoint =
      dataPairDifferenceX > acceptableDifference ||
      dataPairDifferenceY > acceptableDifference;

    addToEnd(buildDataSet, { ...element });

    if (isBreakpoint) {
      const largestDifference = Math.max(
        dataPairDifferenceX,
        dataPairDifferenceY
      );

      [...Array(largestDifference - 1).keys()].forEach(index => {
        const determineIndexDirection = (
          start: number,
          end: number,
          modifier: number = start
        ) => (start < end ? modifier + index : modifier - index);

        const determineNextPoint = (first: number, second: number) =>
          first < second ? first + index + 1 : first - index - 1;

        dataPairDifferenceX > dataPairDifferenceY
          ? addToEnd(buildDataSet, {
              offsetX: determineNextPoint(firstX, secondX),
              offsetY: roundUp(
                average([
                  determineIndexDirection(firstY, secondY),
                  determineIndexDirection(firstY, secondY, secondY)
                ])
              ),
              type: 'generated'
            })
          : addToEnd(buildDataSet, {
              offsetX: roundUp(
                average([
                  determineIndexDirection(firstX, secondX),
                  determineIndexDirection(firstX, secondX, secondX)
                ])
              ),
              offsetY: determineNextPoint(firstY, secondY),
              type: 'generated'
            });
      });
    }
  });

  return buildDataSet;
}

function connectEndToStart(buildDataSet: coordinate[]) {
  const { offsetX: startX, offsetY: startY } = buildDataSet[0];
  const { offsetX: endX, offsetY: endY } = last(buildDataSet);

  const differenceX = Math.abs(endX - startX);
  const differenceY = Math.abs(endY - startY);
  const largestDifference = Math.max(differenceX, differenceY);

  if (largestDifference == 0) return buildDataSet;

  const loopTimes = largestDifference - 1;

  [...Array(loopTimes).keys()].forEach(index => {
    const determineNextPoint = (start: number, end: number, newLast: number) =>
      start > end ? newLast + 1 : newLast - 1;

    const generateForX = differenceX == largestDifference;

    const differenceOfNonGenerators = generateForX
      ? Math.abs(startY - endY)
      : Math.abs(startX - endX);

    const numberOfGenerators = generateForX ? endX - 1 : endY - 1;

    const interval = roundUp(
      (differenceOfNonGenerators / numberOfGenerators) * index
    );

    const nextInterval = (start: number, end: number) =>
      start > end ? end + interval : end - interval;

    const toAdd = {
      offsetX: generateForX
        ? determineNextPoint(startX, endX, last(buildDataSet).offsetX)
        : nextInterval(startX, endX),
      offsetY: !generateForX
        ? determineNextPoint(startY, endY, last(buildDataSet).offsetY)
        : nextInterval(startY, endY),
      type: 'generated' as canvasTypes
    };

    addToEnd(buildDataSet, toAdd);
  });

  return buildDataSet;
}

export function excludeDrawnSegments(dataSet: coordinate[]) {
  const dataSetCopy: coordinate[] = deepCopy(dataSet);

  const matchType = (type: string) =>
    filterForIndices(
      dataSetCopy.map((entry, index) => entry.type == type && index)
    );

  const filterForIndices = (array: any[]) =>
    array.filter(element => element !== false);

  const indexOfAllBegin = matchType('beginDraw');
  const indexOfAllEnd = matchType('endDraw');

  let spliceCounter = 0;

  indexOfAllBegin.forEach((start, index) => {
    let end = indexOfAllEnd[index];
    const numberOfElementsToRemoveIncludingStart = end - start + 1;

    dataSetCopy.splice(
      start - spliceCounter,
      numberOfElementsToRemoveIncludingStart
    );

    spliceCounter += end;
  });

  return dataSetCopy;
}

export function onlyGeneratedCoodinates(outline: coordinate[]) {
  const excludeDrawn = excludeDrawnSegments(outline);

  const onlyGeneratedCoodinates = excludeDrawn.filter(
    ({ type }) => type == 'generated'
  );

  return onlyGeneratedCoodinates;
}
