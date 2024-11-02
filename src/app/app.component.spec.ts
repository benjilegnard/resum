import { AppComponent } from './app.component';
import { beforeEach, describe, it } from 'vitest';
import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { getTranslocoModule } from './transloco-testing.module';

describe('AppComponent', () => {
  let providers: unknown[];
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
