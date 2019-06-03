import { average, createCompleteOutline, sum } from '../Dataset_utils';

describe('createCompleteOutline', () => {
  it('should return a modified array to complete a disconnected one on the x axis', () => {
    const array = [
      {
        offsetX: 1,
        offsetY: 1
      },
      {
        offsetX: 3,
        offsetY: 1
      }
    ];

    const expectedArray = [
      {
        offsetX: 1,
        offsetY: 1
      },
      {
        offsetX: 2,
        offsetY: 1
      },
      {
        offsetX: 3,
        offsetY: 1
      }
    ];

    expect(createCompleteOutline(array, [])).toEqual(expectedArray);
  });

  it('should return a modified array to complete a disconnected one on the y axis', () => {
    const array = [
      {
        offsetX: 1,
        offsetY: 1
      },
      {
        offsetX: 1,
        offsetY: 3
      }
    ];

    const expectedArray = [
      {
        offsetX: 1,
        offsetY: 1
      },
      {
        offsetX: 1,
        offsetY: 2
      },
      {
        offsetX: 1,
        offsetY: 3
      }
    ];

    expect(createCompleteOutline(array, [])).toEqual(expectedArray);
  });

  it('returns the same array if the length is 1', () => {
    const array = [{ offsetX: 1, offsetY: 1 }];

    expect(createCompleteOutline(array, [])).toEqual(array);
  });
});

describe('sum', () => {
  it('should add up an array of numbers and return one number', () => {
    const numbers = [1, 2, 5, -3];

    expect(sum(numbers)).toEqual(5);
  });
});

describe('average', () => {
  it('should compute the average of an array of numbers and return one number', () => {
    const numbers = [4, 8, 3];

    expect(average(numbers)).toEqual(7.5);
  });
});
