import { inject, DOCUMENT } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AvailableLang } from '../model';

export const langResolver: ResolveFn<AvailableLang | null> = (route) => {
  const { lang } = route.params;
  const rootDocument = inject<Document>(DOCUMENT);
  rootDocument.documentElement.lang = lang;
  const translate = inject(TranslocoService);
  translate.setActiveLang(lang);
  return lang as string;
};
