import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardComponent } from './components/card/card.component';
import { PageComponent } from './components/page/page.component';
import { MenuComponent } from './containers/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

@NgModule({
  declarations: [
    CardComponent,
    PageComponent,
    MenuComponent,
    MenuItemComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CardComponent,
    PageComponent,
    MenuComponent,
    MenuItemComponent,
    CommonModule,
    RouterModule,
  ],
})
export class SharedModule {}
