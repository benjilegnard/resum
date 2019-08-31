import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { HeadroomModule } from '@ctrl/ngx-headroom';

import { CardComponent } from './components/card/card.component';
import { PageComponent } from './components/page/page.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [CardComponent, PageComponent, MenuComponent],
  exports: [CardComponent, PageComponent, MenuComponent, CommonModule],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
