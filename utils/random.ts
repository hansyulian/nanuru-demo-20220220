export function random(fromOrTo?: number, to?: number): number {
  let realFrom = 0;
  let realTo = 1;
  if (fromOrTo) {
    if (to) {
      realFrom = fromOrTo;
      realTo = to;
    } else {
      realTo = fromOrTo;
    }
  }
  return Math.random() * (realTo - realFrom) + realFrom;
}

export function randomInteger(fromOrTo?: number, to?: number): number {
  return Math.round(random(fromOrTo, to));
}
