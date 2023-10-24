import { RouteMeta } from '@analogjs/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageComponent } from '../shared/components/page/page.component';

export const routeMeta: RouteMeta = {
  data: { animation: 'ParentPage' },
};

@Component({
  selector: 'bl-timeline',
  imports: [PageComponent],
  template: `<bl-page><h2>Timeline</h2></bl-page>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TimelinePageComponent {}

export default TimelinePageComponent;
