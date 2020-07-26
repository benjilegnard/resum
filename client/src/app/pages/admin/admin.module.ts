import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './containers/admin/admin.component';


/**
 * Administration module.
 */
@NgModule({
  declarations: [AdminComponent],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
