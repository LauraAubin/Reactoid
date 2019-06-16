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
        offsetY: 1,
        type: 'drawn'
      },
      {
        offsetX: 2,
        offsetY: 1,
        type: 'generated'
      },
      {
        offsetX: 3,
        offsetY: 1,
        type: 'drawn'
      },
      {
        offsetX: 2,
        offsetY: 1,
        type: 'generated'
      }
    ];

    expect(createCompleteOutline(array)).toEqual(expectedArray);
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
        offsetY: 1,
        type: 'drawn'
      },
      {
        offsetX: 1,
        offsetY: 2,
        type: 'generated'
      },
      {
        offsetX: 1,
        offsetY: 3,
        type: 'drawn'
      },
      {
        offsetX: 1,
        offsetY: 2,
        type: 'generated'
      }
    ];

    expect(createCompleteOutline(array)).toEqual(expectedArray);
  });

  it('should return a modified array to complete a disconnected one on both axises', () => {
    const array = [
      {
        offsetX: 1,
        offsetY: 12
      },
      {
        offsetX: 4,
        offsetY: 14
      }
    ];

    const expectedArray = [
      {
        offsetX: 1,
        offsetY: 12,
        type: 'drawn'
      },
      {
        offsetX: 2,
        offsetY: 13,
        type: 'generated'
      },
      {
        offsetX: 3,
        offsetY: 14,
        type: 'generated'
      },
      {
        offsetX: 4,
        offsetY: 14,
        type: 'drawn'
      },
      {
        offsetX: 3,
        offsetY: 12,
        type: 'generated'
      },
      {
        offsetX: 2,
        offsetY: 12,
        type: 'generated'
      }
    ];

    expect(createCompleteOutline(array)).toEqual(expectedArray);
  });

  it('returns the same array with a type if the length is 1', () => {
    const array = [{ offsetX: 1, offsetY: 1 }];
    const expectedArray = [{ ...array[0], type: 'drawn' }];

    expect(createCompleteOutline(array)).toEqual(expectedArray);
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
