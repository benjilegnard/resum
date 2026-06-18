import { MarkdownComponent, injectContent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgIconComponent, provideSvgIcons } from '@ngneat/svg-icon';

import { TalkAttributes } from '@benjilegnard/resum/shared/model';

import { calendarBlankIcon } from '../../../svg/calendar-blank';

export const routeMeta: RouteMeta = {
  providers: [provideSvgIcons([calendarBlankIcon])],
};

@Component({
  selector: 'bl-talk',
  template: `
    @if (talk$ | async; as talk) {
      <header class="talk-header">
        <h2>{{ talk.attributes.title }}</h2>
        @if (talk.attributes.presentedAt) {
          <div class="talk-date">
            <svg-icon key="calendar-blank" fontSize="16px"></svg-icon>
            {{ talk.attributes.presentedAt | date }}
          </div>
        }
      </header>
      <div class="talk-content">
        <analog-markdown [content]="talk.content"></analog-markdown>
      </div>
    }
  `,
  styles: [
    `
      .talk-header {
        @apply grid gap-2 mb-4;
      }
      .talk-date {
        @apply flex gap-2 text-text items-baseline;
      }
      .talk-content {
        @apply leading-6 text-xl;
      }
    `,
  ],
  imports: [MarkdownComponent, AsyncPipe, DatePipe, SvgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TalkPageComponent {
  @Input()
  public slug!: string;

  readonly talk$ = injectContent<TalkAttributes>({
    param: 'talkSlug',
    subdirectory: 'talks',
  });
}

export default TalkPageComponent;
