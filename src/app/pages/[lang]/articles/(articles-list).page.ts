import { injectContentFiles } from '@analogjs/content';

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ArticleAttributes } from '@benjilegnard/resum/shared/model';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'bl-articles',
  imports: [RouterLink, TranslocoDirective],
  template: `
    <ng-container *transloco="let t; prefix: 'articles'">
      <h2>{{ t('title') }}</h2>
      <ul>
        @for (article of articles; track article) {
          <li>
            <a [routerLink]="article.slug">{{ article.attributes.title }}</a>
          </li>
        }
      </ul>
    </ng-container>
  `,
})
export class ArticlesListPage {
  private readonly transloco = inject(TranslocoService);
  readonly articles = injectContentFiles<ArticleAttributes>((contentFile) => {
    return contentFile.filename.includes('src/content/articles/');
  })
    .filter((content) => content.attributes.published)
    .filter((content) => {
      return content.attributes.lang === this.transloco.getActiveLang();
    });
}

export default ArticlesListPage;
