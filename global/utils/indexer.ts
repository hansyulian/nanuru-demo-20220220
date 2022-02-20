import { KeyValuePair } from 'global/CustomTypes';

export function indexRecords<T extends Record<string, any>>(
  array: T[],
  indexKey = 'id'
): KeyValuePair<T> {
  const result: KeyValuePair<T> = {};
  for (const element of array) {
    const indexValue = element[indexKey] as string;
    result[indexValue] = element;
  }
  return result;
}
