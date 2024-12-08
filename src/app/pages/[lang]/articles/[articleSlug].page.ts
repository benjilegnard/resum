import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

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
    @if (article$ | async; as article) {
      <header class="article-header">
        <div class="article-date">
          <svg-icon [key]="'calendar-blank'" [fontSize]="'16px'"></svg-icon>
          {{ article.attributes.publishedAt | date }}
        </div>
      </header>
      <div class="article-content">
        <analog-markdown [content]="article.content"></analog-markdown>
      </div>
      <footer class="article-footer">
        <button type="button" title="">
          <svg-icon [key]="'globe-hemisphere-east'" [fontSize]="'16px'" />
        </button>
        <ul class="article-share-box">
          <li></li>
        </ul>
      </footer>
    }
  `,
  styles: [
    `
      .article-header {
        @apply grid flex-row justify-items-end mb-4 leading-4;
      }
      .article-date {
        @apply flex gap-2 text-text self-end items-baseline;
      }
      .article-content {
        @apply leading-6 text-xl;
      }
      .article-footer {
        @apply leading-4;
      }
      .article-share-box{
        @apply list-none;
      }
    `,
  ],
  imports: [MarkdownComponent, AsyncPipe, DatePipe, SvgIconComponent],
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
