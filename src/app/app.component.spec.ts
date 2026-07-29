import { App } from './app.component';
import { beforeEach, describe, it } from 'vitest';
import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { getTranslocoModule } from './transloco-testing.module';
import { EnvironmentProviders, Provider } from '@angular/core';

describe('App', () => {
  let providers: (Provider | EnvironmentProviders)[];
  beforeEach(() => {
    providers = [provideRouter([])];
  });

  it('should create the app', async () => {
    await render(App, {
      providers,
      imports: [getTranslocoModule()],
    });
  });
});
