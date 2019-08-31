import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './pages/about/containers/about/about.component';
import { ProjectsComponent } from './pages/projects/containers/projects/projects.component';
import { SkillsComponent } from './pages/skills/containers/skills/skills.component';
import { TimelineComponent } from './pages/timeline/containers/timeline/timeline.component';
import { ArticlesComponent } from './pages/articles/containers/articles/articles.component';

import { AboutModule } from './pages/about/about.module';
import { SkillsModule } from './pages/skills/skills.module';
import { ArticlesModule } from './pages/articles/articles.module';
import { ProjectsModule } from './pages/projects/projects.module';
import { TimelineModule } from './pages/timeline/timeline.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/articles',
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    // loadChildren: () => import('./pages/articles/articles.module').then(m => m.ArticlesModule),
  },
  {
    path: 'experience',
    component: TimelineComponent,
    // loadChildren: () => import('./pages/timeline/timeline.module').then(m => m.TimelineModule),
  },
  {
    path: 'skills',
    component: SkillsComponent,
    // loadChildren: () => import('./pages/skills/skills.module').then(m => m.SkillsModule),
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    // loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule),
  },
  {
    path: 'about-me',
    component: AboutComponent,
    // loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // pages module
    AboutModule,
    SkillsModule,
    ArticlesModule,
    TimelineModule,
    ProjectsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
