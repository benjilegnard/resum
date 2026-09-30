import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './shared/containers/menu/menu';
import { Page } from './shared/components/page/page';

import { css } from '@styled-system/css';
import { Header } from './shared/components/header/header';

@Component({
  selector: 'bl-root',
  imports: [Header, Menu, Page, RouterOutlet],
  template: `
    <bl-header></bl-header>
    <bl-menu></bl-menu>
    <bl-page>
      <router-outlet></router-outlet>
    </bl-page>
  `,
  host: {
    '[class]': 'hostClass',
  },
})
export class App {
  protected readonly hostClass = css({
    bg: 'surface0',
    display: 'flex',
    flexDirection: 'column',
    h: '100vh',
  });
}
