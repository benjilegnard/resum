import { TestBed } from '@angular/core/testing';
import { CanActivateFn, RouterStateSnapshot } from '@angular/router';

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
        { params: { lang: 'fr' } } as any,
        {} as unknown as RouterStateSnapshot,
      ),
    ).toBe(true);
  });
  it('should return true for "en"', () => {
    expect(
      executeGuard(
        { params: { lang: 'en' } } as any,
        {} as unknown as RouterStateSnapshot,
      ),
    ).toBe(true);
  });
  it('should return false for "it"', () => {
    expect(
      executeGuard(
        { params: { lang: 'it' } } as any,
        {} as unknown as RouterStateSnapshot,
      ),
    ).toBe(false);
  });
});
