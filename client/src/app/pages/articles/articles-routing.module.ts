import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './containers/articles/articles.component';
import { ArticleComponent } from './containers/article/article.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ArticlesComponent,
  },
  {
    path: ':slug',
    component: ArticleComponent,
  },
  {
    path: '**',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
