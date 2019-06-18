export function roundUp(number: number) {
  return Math.ceil(number);
}

export function roundDown(number: number) {
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

export function interval(currentNumber: number, interval: number) {
  return currentNumber % interval == 0;
}
