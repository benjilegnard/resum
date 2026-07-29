import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ArticleAttributes } from '@benjilegnard/resum/shared/model';
import { SvgIconComponent, provideSvgIcons } from '@ngneat/svg-icon';
import { RouteMeta } from '@analogjs/router';

import { css } from '@styled-system/css';

import { calendarBlankIcon } from '../../../svg/calendar-blank';

export const routeMeta: RouteMeta = {
  canActivate: [() => true],
  providers: [provideSvgIcons([calendarBlankIcon])],
};

@Component({
  selector: 'bl-article',
  imports: [MarkdownComponent, AsyncPipe, DatePipe, SvgIconComponent],
  template: `
    @if (article$ | async; as article) {
      <header [class]="styles.header">
        <div [class]="styles.date">
          <svg-icon [key]="'calendar-blank'" [fontSize]="'16px'"></svg-icon>
          {{ article.attributes.publishedAt | date }}
        </div>
      </header>
      <div [class]="styles.content">
        <analog-markdown [content]="article.content"></analog-markdown>
      </div>
      <footer [class]="styles.footer">
        <ul [class]="styles.shareBox">
          <li></li>
        </ul>
      </footer>
    }
  `,
})
export class ArticlePage {
  @Input()
  public slug!: string;

  readonly article$ = injectContent<ArticleAttributes>({
    param: 'articleSlug',
    subdirectory: 'articles',
  });

  protected readonly styles = {
    header: css({
      display: 'grid',
      justifyItems: 'end',
      mb: '4',
      lineHeight: '1rem',
    }),
    date: css({
      display: 'flex',
      alignItems: 'baseline',
      alignSelf: 'flex-end',
      gap: '2',
      color: 'text',
    }),
    content: css({ fontSize: 'xl', lineHeight: '1.5rem' }),
    footer: css({ lineHeight: '1rem' }),
    shareBox: css({ listStyleType: 'none' }),
  };
}

export default ArticlePage;
