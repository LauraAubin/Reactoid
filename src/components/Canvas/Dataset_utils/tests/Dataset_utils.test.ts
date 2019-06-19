import { createCompleteOutline, excludeDrawnSegments } from '../Dataset_utils';
import { canvasTypes } from '../../types/types';
import { last } from '../../../../utilities/arrays';

describe('createCompleteOutline', () => {
  it('should return a modified array to complete a disconnected one on the x axis', () => {
    const array = [
      {
        offsetX: 1,
        offsetY: 1,
        type: 'drawn' as canvasTypes
      },
      {
        offsetX: 3,
        offsetY: 1,
        type: 'drawn' as canvasTypes
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
        offsetY: 1,
        type: 'drawn' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 3,
        type: 'drawn' as canvasTypes
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

  it('should return a modified array to complete a disconnected one on both axis', () => {
    const array = [
      {
        offsetX: 1,
        offsetY: 12,
        type: 'drawn' as canvasTypes
      },
      {
        offsetX: 4,
        offsetY: 14,
        type: 'drawn' as canvasTypes
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
        offsetY: 14,
        type: 'generated'
      },
      {
        offsetX: 2,
        offsetY: 13,
        type: 'generated'
      }
    ];

    expect(createCompleteOutline(array)).toEqual(expectedArray);
  });

  it('should generate an array where the first and last elements are the same give or take 1', () => {
    const array = [
      {
        offsetX: 1,
        offsetY: 1,
        type: 'drawn' as canvasTypes
      },
      {
        offsetX: 3,
        offsetY: 5,
        type: 'drawn' as canvasTypes
      }
    ];

    const expectedArray = createCompleteOutline(array);

    expect(last(expectedArray).offsetX - 1).toEqual(array[0].offsetX);
    expect(last(expectedArray).offsetY - 1).toEqual(array[0].offsetY);
  });

  it('returns the same array with a type if the length is 1', () => {
    const array = [{ offsetX: 1, offsetY: 1, type: 'drawn' as canvasTypes }];
    const expectedArray = [{ ...array[0], type: 'drawn' }];

    expect(createCompleteOutline(array)).toEqual(expectedArray);
  });
});

describe('excludeDrawnSegments', () => {
  it('should remove everything between a beginDraw and an endDraw type inclusive', () => {
    const array = [
      {
        offsetX: 1,
        offsetY: 1,
        type: 'generated' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 2,
        type: 'beginDraw' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 3,
        type: 'drawn' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 4,
        type: 'endDraw' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 5,
        type: 'drawn' as canvasTypes
      }
    ];

    const expectedArray = [
      {
        offsetX: 1,
        offsetY: 1,
        type: 'generated' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 5,
        type: 'drawn' as canvasTypes
      }
    ];

    expect(excludeDrawnSegments(array)).toEqual(expectedArray);
  });

  it('should remove everything between two sets of beginDraw and endDraw types inclusive', () => {
    const array = [
      {
        offsetX: 1,
        offsetY: 1,
        type: 'generated' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 2,
        type: 'beginDraw' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 3,
        type: 'drawn' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 4,
        type: 'endDraw' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 5,
        type: 'drawn' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 4,
        type: 'beginDraw' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 3,
        type: 'drawn' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 2,
        type: 'endDraw' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 1,
        type: 'generated' as canvasTypes
      }
    ];

    const expectedArray = [
      {
        offsetX: 1,
        offsetY: 1,
        type: 'generated' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 5,
        type: 'drawn' as canvasTypes
      },
      {
        offsetX: 1,
        offsetY: 1,
        type: 'generated' as canvasTypes
      }
    ];

    expect(excludeDrawnSegments(array)).toEqual(expectedArray);
  });
});
