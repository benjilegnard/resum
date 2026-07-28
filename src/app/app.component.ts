import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/containers/menu/menu.component';
import { PageComponent } from './shared/components/page/page.component';

import { css } from '@styled-system/css';

@Component({
  selector: 'bl-root',
  template: `
    <bl-menu></bl-menu>
    <bl-page>
      <router-outlet></router-outlet>
    </bl-page>
  `,
  host: {
    '[class]': 'hostClass',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuComponent, PageComponent, RouterOutlet],
})
export class AppComponent {
  protected readonly hostClass = css({
    display: 'flex',
    flexDirection: 'column',
    h: '100vh',
  });
}
