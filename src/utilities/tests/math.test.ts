import { average, sum } from '../math';

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
