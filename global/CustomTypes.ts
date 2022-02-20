import { Moment } from "moment";

export interface KeyValuePair<T = string> {
  [key: string]: T;
}

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
}


export interface ListInfo {
  count: number;
}

export type AsyncReduxLoadState = 'UNLOADED' | 'LOADING' | 'LOADED' | 'ERROR';
export type AsyncReduxMutationState =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED';

export interface CustomError {
  type: string;
  details: Record<string, any>;
  message: string;
}
export type Resolve = (data: any) => void;
export type Reject = (reason: any) => void;
export type OrderDirection = 'asc' | 'desc';
export interface ListQuery {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}
export interface ReduxRecordState<RecordType> {
  state: AsyncReduxLoadState;
  record?: RecordType;
  error?: CustomError;
}
export type DateTimeParameter = Date | Moment | string | number;
export interface SelectOption<T extends string = string> {
  text: string;
  value: T;
}

export interface SimpleStatus {
  success: boolean;
}

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type RootStatePartial<T> = {
  [P in keyof T]?: Partial<T[P]>;
}

export type RecordList<T> = {
  records: T[];
  count: number;
}

export type ForceableReload<T> = {
  forced?: boolean;
} & T;
