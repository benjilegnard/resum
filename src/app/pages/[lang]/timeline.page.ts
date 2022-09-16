import { RouteMeta } from '@analogjs/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { PageComponent } from '../../shared/components/page/page.component';

export const routeMeta: RouteMeta = {
  data: { animation: 'ParentPage' },
};

@Component({
  selector: 'bl-timeline',
  imports: [TranslocoDirective, PageComponent],
  template: `
    <bl-page *transloco="let t; read: 'timeline'">
      <h2>{{ t('title') }}</h2>
    </bl-page>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePageComponent {}

export default TimelinePageComponent;
