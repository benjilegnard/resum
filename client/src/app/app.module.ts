import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ScullyLibModule.forRoot({ useTransferState: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
