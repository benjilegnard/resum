import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'bl-about',
  imports: [TranslocoDirective],
  template: `
    <ng-container *transloco="let t; read: 'about'">
      <h2>{{ t('title') }}</h2>
      <h3>{{ t('skills.title') }}</h3>
      <p>{{ t('skills.description') }}</p>
      <h3>{{ t('thisBlog.title') }}</h3>
      <p>{{ t('thisBlog.description') }} :</p>
      <ul>
        <li>
          {{ t('thisBlog.credits.icons.by') }}
          <a href="https://phosphoricons.com/" target="_blank">Phosphoricons</a>
        </li>
        <li>
          {{ t('thisBlog.credits.analog.by') }}
          <a href="https://analogjs.org/" target="_blank">Analogjs</a>
        </li>
        <li>
          {{ t('thisBlog.credits.cloudflare.by') }}
          <a href="https://cloudflare.com/" target="_blank">Cloudflare</a>
        </li>
      </ul>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AboutPageComponent {}

export default AboutPageComponent;
