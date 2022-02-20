import { KeyValuePair } from 'global/CustomTypes';

export function parseQuery(stringQuery?: string): KeyValuePair<string> {
  if (stringQuery === undefined) {
    return {};
  }
  const stringQuerySplits: string[] = stringQuery.split('&');
  const query: KeyValuePair<string> = {};
  for (const stringQuerySplit of stringQuerySplits) {
    const splits: string[] = stringQuerySplit.split('=');
    query[splits[0]] = splits[1];
  }
  return query;
}

export function serializeQuery(
  object: KeyValuePair<string | number | undefined | null>
): string {
  const keys: string[] = Object.keys(object);
  const stringifiedArray: string[] = [];
  for (const key of keys) {
    if (object[key] !== undefined && object[key] !== null) {
      stringifiedArray.push(`${key}=${object[key]}`);
    }
  }
  return stringifiedArray.join('&');
}
