import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './shared/containers/menu/menu.component';
import { Page } from './shared/components/page/page.component';

import { css } from '@styled-system/css';

@Component({
  selector: 'bl-root',
  imports: [Menu, Page, RouterOutlet],
  template: `
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
    display: 'flex',
    flexDirection: 'column',
    h: '100vh',
  });
}
