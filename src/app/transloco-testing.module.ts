import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@ngneat/transloco';
import * as en from '../assets/i18n/en.json';
import * as fr from '../assets/i18n/fr.json';
import { availableLangs } from './shared/model';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, fr },
    translocoConfig: {
      availableLangs,
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
