import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader, hmrModule } from '@angularclass/hmr';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function basicBootstrap() {
  return platformBrowserDynamic().bootstrapModule(AppModule)
    .then(MODULE_REF => {
      console.log('Bootstrap success');

      return MODULE_REF;
    });
  // .catch(err => console.error(err));
}


bootloader(() => {
  const promise = platformBrowserDynamic().bootstrapModule(AppModule);

  if (environment.hmr) {
    ( module as any).hot.accept();

    promise.then((mod) => {
      return hmrModule(mod,  module as any);
    });
  }
});
