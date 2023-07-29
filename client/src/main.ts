import 'zone.js';
import { enableProdMode } from '@angular/core'; 
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

if (import.meta.env.PROD) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig);
