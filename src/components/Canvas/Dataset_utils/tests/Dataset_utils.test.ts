import { endsWhereItStarts, isBetween, isOutline } from '../Dataset_utils';
import { circle } from './SampleDatasets/Circle';

describe('isBetween', () => {
  it('should return true if 5 is between 9 with a modifier of 5', () => {
    expect(isBetween(5, 9, 5)).toBe(true);
  });

  it('should return false if 5 is not between 9 with a modifier of 2', () => {
    expect(isBetween(5, 9, 2)).toBe(false);
  });
});

describe('endsWhereItStarts', () => {
  it('should return true if the initial start coodinate is close to the final one', () => {
    const array = [
      {
        offsetX: 1,
        offsetY: 1
      },
      {
        offsetX: 2,
        offsetY: 3
      },
      {
        offsetX: 3,
        offsetY: 2
      }
    ];

    expect(isBetween(5, 9, 5)).toBe(true);
  });

  it('should return true if the initial start coodinate is close to the final one', () => {
    expect(isBetween(5, 9, 5)).toBe(true);
  });
});

describe('isOutline', () => {
  it('should return true if shape is closed', () => {
    expect(isOutline(circle)).toBe(true);
  });

  it('should return true if circle is closed after autoconnect', () => {});

  it('should return false if partial circle is not closed', () => {});

  it('should return false if there are too many overlaps', () => {});

  it('should return false if the shape is filled in too much', () => {});
});
