export function isEmpty(someVar: any): boolean {
  if (someVar === undefined || someVar === null) {
    return true;
  }
  if (typeof someVar === 'object') {
    return Object.keys(someVar).length === 0 && someVar.constructor === Object;
  }
  const stringValue: string = someVar.toString();
  return !stringValue || stringValue.length === 0;
}

export function isAnyEmpty(values: any[]): boolean {
  for (const value of values) {
    if (isEmpty(value)) {
      return true;
    }
  }
  return false;
}
