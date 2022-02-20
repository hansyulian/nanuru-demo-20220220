import { SelectOption } from 'global/CustomTypes';

export function findSelectOptionByValue(
  options: SelectOption[],
  value: string | number
) {
  for (const option of options) {
    if (option.value === value) {
      return option;
    }
  }
}
