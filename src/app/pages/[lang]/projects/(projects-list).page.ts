import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { PageComponent } from '../../../shared/components/page/page.component';

@Component({
  selector: 'bl-projects',
  imports: [TranslocoDirective, PageComponent],
  template: `
    <bl-page *transloco="let t; prefix: 'projects'">
      <h2>{{ t('title') }}</h2>
      <p>
        {{ t('description') }}
      </p>
    </bl-page>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListPageComponent {}

export default ProjectsListPageComponent;
