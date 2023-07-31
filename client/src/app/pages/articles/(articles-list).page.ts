import { injectContentFiles } from '@analogjs/content';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ArticleAttributes } from '@benjilegnard/resum/shared/model';

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
  readonly articles = injectContentFiles<ArticleAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/articles/');
  });
}

export default ArticlesPageComponent;
