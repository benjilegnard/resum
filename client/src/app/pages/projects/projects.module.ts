import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './containers/projects/projects.component';


@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
