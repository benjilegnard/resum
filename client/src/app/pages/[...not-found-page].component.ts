import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bl-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <ng-container *transloco="let t">
      <h2>{{ t('errors.404.title') }}</h2>
      <p>{{ t('errors.404.description') }}</p>
      <a routerLink="/">{{ t('ui.actions.backToHome') }}</a>
    </ng-container>
  `,
  styles: [``],
})
export class NotFoundPageComponent {}

export default NotFoundPageComponent;
