import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { langResolver } from './lang.resolver';
import { AvailableLang } from '../model';
import { TranslocoService } from '@jsverse/transloco';
import { DOCUMENT } from '@angular/common';

describe('langResolver', () => {
  const executeResolver: ResolveFn<AvailableLang | null> = (
    ...resolverParameters
  ) => TestBed.runInInjectionContext(() => langResolver(...resolverParameters));
  let translocoServiceStub: Partial<TranslocoService>;
  let documentStub: Partial<Document>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslocoService,
          useValue: { setActiveLang: vitest.fn() } as Partial<TranslocoService>,
        },
        { provide: DOCUMENT, useValue: document },
      ],
    });
    translocoServiceStub = TestBed.inject(TranslocoService);
    documentStub = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should return "fr" for "fr"', () => {
    expect(
      executeResolver({ params: { lang: 'fr' } } as any, undefined as any),
    ).toBe('fr');
    expect(translocoServiceStub.setActiveLang).toHaveBeenCalledWith('fr');
    expect(documentStub.documentElement?.lang).toBe('fr');
  });
});
