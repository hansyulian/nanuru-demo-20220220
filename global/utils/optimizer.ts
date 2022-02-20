import { AsyncReduxLoadState } from "global/CustomTypes";

export function isAsyncReduxLoadStateShouldReload(state: AsyncReduxLoadState): boolean {
  return ['UNLOADED'].indexOf(state) !== -1;
}