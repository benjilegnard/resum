import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './containers/articles/articles.component';
import { ArticleComponent } from './containers/article/article.component';


@NgModule({
  declarations: [ArticlesComponent, ArticleComponent],
  imports: [
    SharedModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
