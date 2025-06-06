import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'bl-projects',
  imports: [TranslocoDirective],
  template: `
    <ng-container *transloco="let t; read: 'projects'">
      <h2>{{ t('title') }}</h2>
      <p>
        {{ t('description') }}
      </p>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListPageComponent {}

export default ProjectsListPageComponent;
