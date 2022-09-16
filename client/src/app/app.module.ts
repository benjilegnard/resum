import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, MinimalRouterStateSerializer, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { take } from 'rxjs/operators';
import { removeNgStyles, createInputTransfer, createNewHosts } from '@angularclass/hmr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fromRoot from './reducers';
import { reducers, metaReducers } from './reducers';

import { AppEffects } from './app.effects';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { SetAppState } from './actions/app.actions';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      serializer: MinimalRouterStateSerializer,
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ScullyLibModule.forRoot({useTransferState: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private appRef: ApplicationRef,
    private rootStore: Store<fromRoot.State>,
  ) {}

  public hmrOnInit(store) {
    if (!store || !store.state) {
      return;
    }
    // restore state
    this.rootStore.dispatch(new SetAppState(store.state));
    // restore input values
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      // this isn't clean but gets the job done in development
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  public hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(
      cmp => cmp.location.nativeElement,
    );
    let currentState: fromRoot.State;
    this.rootStore.pipe(take(1)).subscribe(state => (currentState = state));
    store.state = currentState;
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
