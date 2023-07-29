import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/containers/menu/menu.component';
import { PageComponent } from './shared/components/page/page.component';

@Component({
  selector: 'bl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [MenuComponent, PageComponent, RouterOutlet],
})
export class AppComponent {}
