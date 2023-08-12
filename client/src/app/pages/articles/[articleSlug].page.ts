import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import 'prismjs';
import 'prismjs/themes/prism.css';

import { ArticleAttributes } from '@benjilegnard/resum/shared/model';

@Component({
  selector: 'bl-article',
  template: `
    <ng-container *ngIf="article$ | async as article">
      <p class="article-header">
        <span class="article-date"
          >{{ article.attributes.publishedAt | date }}
        </span>
      </p>
      <div class="article-content">
        <analog-markdown [content]="article.content"></analog-markdown>
      </div>
      <ul class="article-share-box">
        <li></li>
      </ul>
    </ng-container>
  `,
  styles: [
    `
      .article-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      .article-content {
      }
    `,
  ],
  imports: [MarkdownComponent, NgIf, AsyncPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ArticlePageComponent {
  @Input()
  public slug!: string;

  readonly article$ = injectContent<ArticleAttributes>({
    param: 'articleSlug',
    subdirectory: 'articles',
  });
}

export default ArticlePageComponent;
