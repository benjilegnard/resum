import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'bl-timeline',
  imports: [TranslocoDirective],
  template: `
    <ng-container *transloco="let t; read: 'timeline'">
      <h2>{{ t('title') }}</h2>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TimelinePageComponent {}

export default TimelinePageComponent;
