import { RouteMeta } from '@analogjs/router';
import { injectResponse } from '@analogjs/router/tokens';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

export const routeMeta: RouteMeta = {
  canActivate: [
    () => {
      const response = injectResponse();
      if (import.meta.env.SSR && response) {
        response.statusCode = 404;
        response.end();
      }
      return true;
    },
  ],
};

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
