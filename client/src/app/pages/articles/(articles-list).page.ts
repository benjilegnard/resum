import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ArticleAttributes } from '@benjilegnard/resum/shared/model';
import { PageComponent } from '../../shared/components/page/page.component';

export const routeMeta: RouteMeta = {
  data: { animation: 'ParentPage' },
};

@Component({
  selector: 'bl-articles',
  template: `<bl-page
    ><h2>Articles</h2>
    <ul>
      <li *ngFor="let article of articles">
        <a [routerLink]="article.slug">{{ article.attributes.title }}</a>
      </li>
    </ul>
  </bl-page>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe, PageComponent],
})
export class ArticlesPageComponent {
  readonly articles = injectContentFiles<ArticleAttributes>((contentFile) => {
    return contentFile.filename.includes('/src/content/articles/');
  }).filter((content) => content.attributes.published);
}

export default ArticlesPageComponent;
