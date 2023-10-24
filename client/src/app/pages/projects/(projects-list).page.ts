import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageComponent } from '../../shared/components/page/page.component';

@Component({
  selector: 'bl-projects',
  imports: [PageComponent],
  template: `<bl-page
    ><h2>Projects</h2>

    <p>Here are some side project that you could be interested in:</p>
    <ul>
      <li><a></a></li></ul
  ></bl-page> `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProjectsListPageComponent {}

export default ProjectsListPageComponent;
