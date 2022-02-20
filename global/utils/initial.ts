export function initial(value: string, length?: number): string {
  const splits = value.split(' ');
  const initial = splits.filter(word => word.length > 0).map((word) => word[0].toUpperCase()).join('');
  if (length) {
    return initial.substr(0, length);
  }
  return initial;
}
