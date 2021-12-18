import { NgModule } from '@angular/core';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './containers/timeline/timeline.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [TimelineComponent],
    imports: [
        SharedModule,
        TimelineRoutingModule
    ]
})
export class TimelineModule { }
