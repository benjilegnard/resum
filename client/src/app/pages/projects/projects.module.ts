import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './containers/projects/projects.component';


@NgModule({
  declarations: [ProjectsComponent],
  entryComponents: [ProjectsComponent],
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
