import { KeyValuePair } from 'global/CustomTypes';

export function cleanUndefined(obj: KeyValuePair<any>): KeyValuePair {
  const result: KeyValuePair = {};
  const entries = Object.entries(obj);
  for (const entry of entries) {
    const [key, value] = entry;
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}
export function cleanEmpty<T = KeyValuePair>(obj: KeyValuePair<any>): T {
  const result: KeyValuePair = {};
  const entries = Object.entries(obj);
  for (const entry of entries) {
    const [key, value] = entry;
    if (
      value === undefined ||
      value === null ||
      (value.length !== undefined && value.length === 0)
    ) {
      continue;
    }
    result[key] = value;
  }
  return result as unknown as T;
}
