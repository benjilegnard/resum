import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageComponent } from '../..//shared/components/page/page.component';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'bl-home',
  standalone: true,
  imports: [TranslocoDirective, RouterLink, PageComponent],
  template: `
    <bl-page *transloco="let t; read: 'home'">
      <h2>{{ t('title') }}</h2>

      <h3>{{ t('subTitle') }}</h3>
      <p>{{ t('introduction') }}</p>
      <nav>
        <ul>
          <li>
            <a routerLink="articles">{{ t('callToAction.articles') }}</a>
          </li>
          <li>
            <a routerLink="projects">{{ t('callToAction.projects') }}</a>
          </li>
          <li>
            <a routerLink="about">{{ t('callToAction.about') }}</a>
          </li>
        </ul>
      </nav>
    </bl-page>
  `,
  styles: [``],
})
export class HomePageComponent {}

export default HomePageComponent;
