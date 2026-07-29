import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'bl-not-found',
  standalone: true,
  imports: [RouterLink, TranslocoDirective],
  template: `
    <ng-container *transloco="let t">
      <h2>{{ t('errors.404.title') }}</h2>
      <p>{{ t('errors.404.description') }}</p>
      <a routerLink="/">{{ t('ui.actions.backToHome') }}</a>
    </ng-container>
  `,
})
export class NotFoundPage {}

export default NotFoundPage;
