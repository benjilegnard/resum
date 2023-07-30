import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bl-timeline',
  template: `<h2>Timeline</h2>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TimelinePageComponent {}

export default TimelinePageComponent;
