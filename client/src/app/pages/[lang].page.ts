import { RouteMeta } from '@analogjs/router';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvailableLang, availableLangs } from '../shared/model';
import { DOCUMENT } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';

export const routeMeta: RouteMeta = {
  canActivate: [
    (route) => {
      return availableLangs.includes(route.params['lang'] as AvailableLang);
    },
  ],
  resolve: {
    lang: (route) => {
      const { lang } = route.params;
      const rootDocument = inject<Document>(DOCUMENT);
      rootDocument.documentElement.lang = lang;
      const translate = inject(TranslocoService);
      translate.setActiveLang(lang);
      return lang as string;
    },
  },
};

@Component({
  selector: 'bl-lang',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: [``],
})
export class LangPageComponent {}

export default LangPageComponent;
