import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/containers/menu/menu.component';
import { PageComponent } from './shared/components/page/page.component';

@Component({
  selector: 'bl-root',
  template: `
    <bl-menu></bl-menu>
    <bl-page>
      <router-outlet></router-outlet>
    </bl-page>
  `,
  styles: [
    `
      :host {
        @apply flex flex-col h-screen;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuComponent, PageComponent, RouterOutlet],
})
export class AppComponent {}
