import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'bl-timeline',
  imports: [TranslocoDirective],
  template: `
    <ng-container *transloco="let t; prefix: 'timeline'">
      <h2>{{ t('title') }}</h2>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePageComponent {}

export default TimelinePageComponent;
