import { Action } from '@ngrx/store';
import * as fromRoot from '../reducers';

export enum AppActionTypes {
  SetAppState = '[App] Set App State',
  LoadConfig = '[App] Load Config',
}

export class LoadConfig implements Action {
  readonly type = AppActionTypes.LoadConfig;
}

export class SetAppState implements Action {
  readonly type = AppActionTypes.SetAppState;
  constructor(public payload: fromRoot.State) {}
}

export type AppActions = LoadConfig | SetAppState;
