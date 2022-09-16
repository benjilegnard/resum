import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@ngneat/transloco';
import { PageComponent } from '../shared/components/page/page.component';

export const routeMeta: RouteMeta = {
  data: { animation: 'ParentPage' },
};

@Component({
  selector: 'bl-lang-selector',
  standalone: true,
  imports: [RouterLink, TranslocoDirective, PageComponent],
  template: `
    <bl-page *transloco="let t">
      <h2>{{ t('lang.select') }} :</h2>
      <ul>
        <li>
          <a routerLink="/en">{{ t('lang.langs.en') }} 🇬🇧</a>
        </li>
        <li>
          <a routerLink="/fr">{{ t('lang.langs.fr') }} 🇫🇷</a>
        </li>
      </ul>
    </bl-page>
  `,
  styles: [``],
})
export class LangSelectorPageComponent {}

export default LangSelectorPageComponent;
