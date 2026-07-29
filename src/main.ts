import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

if (import.meta.env.PROD) {
  enableProdMode();
}

bootstrapApplication(App, appConfig);
