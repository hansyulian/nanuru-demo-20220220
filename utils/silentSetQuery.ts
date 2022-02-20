import { serializeQuery } from './query';

export function silentSetQuery(query: any) {
  if (window.history.pushState) {
    const stringQuery = serializeQuery(query);
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      (stringQuery ? `?${stringQuery}` : '');
    window.history.pushState({ path: newurl }, '', newurl);
  }
}
