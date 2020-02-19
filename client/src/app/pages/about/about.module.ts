import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './containers/about/about.component';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    SharedModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
