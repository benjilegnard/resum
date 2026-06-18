import { AppComponent } from './app.component';
import { beforeEach, describe, it } from 'vitest';
import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { getTranslocoModule } from './transloco-testing.module';
import { EnvironmentProviders, Provider } from '@angular/core';

describe('AppComponent', () => {
  let providers: (Provider | EnvironmentProviders)[];
  beforeEach(() => {
    providers = [provideRouter([])];
  });

  it('should create the app', async () => {
    await render(AppComponent, {
      providers,
      imports: [getTranslocoModule()],
    });
  });
});
