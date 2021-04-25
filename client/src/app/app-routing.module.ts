import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'articles',
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./pages/articles/articles.module').then(m => m.ArticlesModule),
  },
  {
    path: 'experience',
    loadChildren: () =>
      import('./pages/timeline/timeline.module').then(m => m.TimelineModule),
  },
  {
    path: 'skills',
    loadChildren: () =>
      import('./pages/skills/skills.module').then(m => m.SkillsModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.module').then(m => m.ProjectsModule),
  },
  {
    path: 'about-me',
    loadChildren: () =>
      import('./pages/about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
