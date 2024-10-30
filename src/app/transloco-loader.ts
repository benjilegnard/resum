import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import * as path from 'path';
import * as fs from 'fs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  getTranslation(lang: string) {
    if (import.meta.env.SSR) {
      // pre-render
      if ((globalThis as any).$fetch) {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        return new Promise<Translation>((resolve) => {
          const langJson = fs.readFileSync(
            path.join(__dirname, `./assets/i18n/${lang}.json`),
            'utf-8',
          );
          const res = JSON.parse(langJson);
          resolve(res);
        });
      }
      // running on live-reload mode, node.js SSR
      return this.http.get<Translation>(
        `${
          import.meta.env.VITE_ANALOG_PUBLIC_BASE_URL
        }/assets/i18n/${lang}.json`,
      );
    }

    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}
