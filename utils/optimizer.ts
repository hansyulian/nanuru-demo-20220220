import { AsyncReduxLoadState } from "CustomTypes";

export function isAsyncReduxLoadStateShouldReload(state: AsyncReduxLoadState): boolean {
  return ['UNLOADED'].indexOf(state) !== -1;
}