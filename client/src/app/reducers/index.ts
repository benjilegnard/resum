import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { stateSetter, actionLogger } from './meta.reducers';

export interface State {
  router?: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};

// router selectors.

export const selectRouter = createFeatureSelector<
  fromRouter.RouterReducerState<any>
>('router');

const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectRouteId = selectRouteParam('id');
export const selectStatus = selectQueryParam('status');

// META reducers
export const metaReducers: MetaReducer<State>[] = !environment.production ? [stateSetter, actionLogger] : [];
