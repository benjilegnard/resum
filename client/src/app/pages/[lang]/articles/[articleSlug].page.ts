import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import 'prismjs';
import 'prismjs/themes/prism.css';

import { ArticleAttributes } from '@benjilegnard/resum/shared/model';
import { SvgIconComponent, provideSvgIcons } from '@ngneat/svg-icon';
import { RouteMeta } from '@analogjs/router';

import { calendarBlankIcon } from '../../../svg/calendar-blank';

export const routeMeta: RouteMeta = {
  canActivate: [() => true],
  providers: [provideSvgIcons([calendarBlankIcon])],
};

@Component({
  selector: 'bl-article',
  template: `
    <ng-container *ngIf="article$ | async as article">
      <div class="article-header">
        <span class="article-date"
          ><svg-icon [key]="'calendar-blank'" [fontSize]="'16px'"></svg-icon>
          {{ article.attributes.publishedAt | date }}
        </span>
      </div>
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
      .article-header {
        line-height: 16px;
      }
      .article-date {
        display: flex;
        gap: 8px;
        font-size: 16px;
      }
    `,
  ],
  imports: [MarkdownComponent, NgIf, AsyncPipe, DatePipe, SvgIconComponent],
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
