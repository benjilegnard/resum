import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './containers/articles/articles.component';


@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    SharedModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
