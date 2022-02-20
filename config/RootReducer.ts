import { combineReducers } from 'redux';
import { itemReducer } from 'stores/item/reducer';

export const combinedReducer = combineReducers({
  item: itemReducer
});
export const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
}

export type RootState = ReturnType<typeof combinedReducer>;
