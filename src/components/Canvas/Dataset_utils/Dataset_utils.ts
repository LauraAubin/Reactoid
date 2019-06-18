import { canvasTypes, coordinate } from '../types/types';
import { addToEnd, last, deepCopy } from '../../../utilities/arrays';
import { average, roundUp } from '../../../utilities/math';

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
              offsetY: determineOffsetDirection(firstY, secondY),
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
      ),
      type: 'generated' as canvasTypes
    };

    addToEnd(buildDataSet, toAdd);
  });

  return buildDataSet;
}

export function excludeDrawnSegments(dataSet: coordinate[]) {
  const dataSetCopy: coordinate[] = deepCopy(dataSet);

  const indexOfAll = (type: string) =>
    dataSetCopy
      .map(entry => {
        if (entry.type == type) return dataSetCopy.indexOf(entry);
      })
      .filter(index => index !== undefined);

  const indexOfAllBeginDraw = indexOfAll('beginDraw');
  const indexOfAllEndDraw = indexOfAll('endDraw');

  indexOfAllBeginDraw.forEach(
    (beginDrawIndex, index) =>
      typeof beginDrawIndex == 'number' &&
      dataSetCopy.splice(beginDrawIndex, indexOfAllEndDraw[index])
  );

  return dataSetCopy;
}
