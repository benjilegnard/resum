import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './containers/skills/skills.component';



@NgModule({
  declarations: [SkillsComponent],
  imports: [
    SharedModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
