import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageComponent } from '../shared/components/page/page.component';

@Component({
  selector: 'bl-not-found',
  standalone: true,
  imports: [RouterLink, PageComponent],
  template: `
    <bl-page *transloco="let t">
      <h2>{{ t('errors.404.title') }}</h2>
      <p>{{ t('errors.404.description') }}</p>
      <a routerLink="/">{{ t('ui.actions.backToHome') }}</a>
    </bl-page>
  `,
  styles: [``],
})
export class NotFoundPageComponent {}

export default NotFoundPageComponent;
