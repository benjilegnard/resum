import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';
import { PageComponent } from '../../../shared/components/page/page.component';

@Component({
  selector: 'bl-projects',
  imports: [TranslocoDirective, PageComponent],
  template: `
    <bl-page *transloco="let t; read: 'projects'">
      <h2>{{ t('title') }}</h2>
      <p>
        {{ t('description') }}
      </p>
    </bl-page>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProjectsListPageComponent {}

export default ProjectsListPageComponent;
