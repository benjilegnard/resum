import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { SharedModule } from '../../shared/shared.module';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './containers/articles/articles.component';
import { ArticleComponent } from './containers/article/article.component';


@NgModule({
  declarations: [ArticlesComponent, ArticleComponent],
  imports: [
    SharedModule,
    ScullyLibModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
