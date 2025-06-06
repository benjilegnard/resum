import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { describe, beforeEach, it, expect } from 'vitest';

import { availableLangGuard } from './available-lang.guard';

describe('availableLangGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => availableLangGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true for "fr"', () => {
    expect(
      executeGuard(
        { params: { lang: 'fr' } } as unknown as ActivatedRouteSnapshot,
        {} as unknown as RouterStateSnapshot,
      ),
    ).toBe(true);
  });
  it('should return true for "en"', () => {
    expect(
      executeGuard(
        { params: { lang: 'en' } } as unknown as ActivatedRouteSnapshot,
        {} as unknown as RouterStateSnapshot,
      ),
    ).toBe(true);
  });
  it('should return false for "it"', () => {
    expect(
      executeGuard(
        { params: { lang: 'it' } } as unknown as ActivatedRouteSnapshot,
        {} as unknown as RouterStateSnapshot,
      ),
    ).toBe(false);
  });
});
