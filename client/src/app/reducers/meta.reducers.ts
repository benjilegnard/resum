import { ActionReducer, Action } from '@ngrx/store';
import { AppActions, AppActionTypes } from 'app/actions/app.actions';

// state setter for hot reload
export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: AppActions) => {
    if (action.type === AppActionTypes.SetAppState) {
      return action.payload;
    }
    return reducer(state, action);
  };
}

export function actionLogger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: Action) => {
    console.groupCollapsed(action.type);
    console.log('old state', state);
    const newState = reducer(state, action);
    console.log('new state', newState);
    console.groupEnd();
    return newState;
  };
}
