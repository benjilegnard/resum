import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { langResolver } from '../shared/i18n/lang.resolver';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  resolve: {
    lang: langResolver,
  },
};

@Component({
  selector: 'bl-lang-selector',
  standalone: true,
  imports: [RouterLink, TranslocoDirective],
  template: `
    <ng-container *transloco="let t">
      <h2>{{ t('lang.select') }} :</h2>
      <ul>
        <li>
          <a routerLink="/en"> {{ t('lang.langs.en') }} 🇬🇧</a>
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
