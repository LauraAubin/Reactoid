export function addToEnd(buildArray: any[], toAdd: any) {
  buildArray.push(toAdd);
}

export function last(array: any[]) {
  return array[array.length - 1];
}

export function deepCopy(array: any[]) {
  return JSON.parse(JSON.stringify(array));
}