import { SelectOption } from 'global/CustomTypes';

export function getTextByValue<T extends string = string>(
  value: T | undefined,
  options: SelectOption<T>[]
): string {
  for (const option of options) {
    if (option.value === value) {
      return option.text;
    }
  }
  return '';
}
