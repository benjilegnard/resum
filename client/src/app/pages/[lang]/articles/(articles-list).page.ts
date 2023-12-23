import { injectContentFiles } from '@analogjs/content';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ArticleAttributes } from '@benjilegnard/resum/shared/model';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'bl-articles',
  template: `<h2>Articles</h2>
    <ul>
      <li *ngFor="let article of articles">
        <a [routerLink]="article.slug">{{ article.attributes.title }}</a>
      </li>
    </ul> `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe],
})
export class ArticlesPageComponent {
  private readonly transloco = inject(TranslocoService);
  readonly articles = injectContentFiles<ArticleAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/articles/');
  })
    .filter((content) => content.attributes.published)
    .filter((content) => {
      return content.attributes.lang === this.transloco.getActiveLang();
    });
}

export default ArticlesPageComponent;
