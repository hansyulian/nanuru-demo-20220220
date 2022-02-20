import { KeyValuePair } from 'global/CustomTypes';

export function replaceAll(
  source: string,
  search: string,
  value: string
): string {
  return source.replace(new RegExp(search, 'g'), value);
}

export function stringRender(
  template: string,
  data: Record<string, string | number>
): string {
  const entries = Object.entries(data);
  let result = template;
  for (const entry of entries) {
    result = replaceAll(result, `{${entry[0]}}`, entry[1].toString());
    console.log(result, entry[0], entry[1]);
  }
  return result;
}

export function stringFormat(
  format: string,
  values: KeyValuePair<string> = {}
): string {
  let result: string = format;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp('\\{' + key + '\\}', 'g'), value);
  }
  result = result.replace(new RegExp('\\{[a-zA-Z0-9]+\\}', 'g'), '');
  return result;
}
