import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, Subject } from 'rxjs';

import { AppEffects } from './app.effects';
import { Actions } from '@ngrx/effects';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        { provide: Actions, useValue: actions$ },
        // provideMockActions(() => actions$)
      ],
    });

    effects = TestBed.get<AppEffects>(AppEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
