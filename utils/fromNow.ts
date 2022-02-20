export function fromNowSeconds(seconds: number) {
  return new Date().getTime() / 1000 + seconds;
}
