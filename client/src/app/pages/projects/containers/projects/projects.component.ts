import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bl-projects',
  template: `<h2>Projects</h2>

    <p>Here are some side project that you could be interested in:</p> `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProjectsComponent {}
