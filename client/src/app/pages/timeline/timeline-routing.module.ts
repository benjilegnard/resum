import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelineComponent } from './containers/timeline/timeline.component';


const routes: Routes = [{
  path: '',
  component: TimelineComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
