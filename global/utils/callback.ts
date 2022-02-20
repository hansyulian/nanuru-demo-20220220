export function callback<T = unknown>(
  fn: (...params: any[]) => T,
  ...params: unknown[]
): () => T {
  return () => fn(...params);
}
