import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

export const routeMeta: RouteMeta = {
  meta: [
    { name: 'description', content: "Benjamin Legrand's personal website" },
    { name: 'author', content: 'Benjamin Legrand' },
    {
      name: 'og:title',
      content: "Benjamin Legrand's personal website, select your language",
    },
  ],
};

@Component({
  selector: 'bl-lang-selector',
  imports: [RouterLink, TranslocoDirective],
  template: `
    <ng-container *transloco="let t">
      <h2>{{ t('lang.select') }} :</h2>
      <ul>
        <li>
          <a routerLink="/en">{{ t('lang.langs.en') }} 🇬🇧</a>
        </li>
        <li>
          <a routerLink="/fr">{{ t('lang.langs.fr') }} 🇫🇷</a>
        </li>
      </ul>
    </ng-container>
  `,
  styles: [``],
})
export class LangSelectorPageComponent {}

export default LangSelectorPageComponent;
