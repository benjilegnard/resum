import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';

@Component({
  selector: 'bl-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [MenuItemComponent, RouterLink],
})
export class MenuComponent {}
