export function setValue<Record, Key extends keyof Record>(
  record: Record,
  key: Key,
  value: Record[Key]
) {
  record[key] = value;
}
