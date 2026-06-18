import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';

import { MenuComponent } from './menu.component';

import { getTranslocoModule } from '../../../transloco-testing.module';
import {
  EnvironmentProviders,
  ModuleWithProviders,
  Provider,
  Type,
} from '@angular/core';

describe('MenuComponent', () => {
  let providers: (Provider | EnvironmentProviders)[];
  let imports: (Type<unknown> | ModuleWithProviders<unknown>)[];
  beforeEach(() => {
    providers = [provideRouter([])];
    imports = [MenuComponent, getTranslocoModule()];
  });

  it('should create', async () => {
    const { container } = await render(MenuComponent, {
      imports,
      providers,
    });
    expect(container).toBeTruthy();
  });

  it('should render title', async () => {
    const { getByText } = await render(MenuComponent, {
      imports,
      providers,
    });
    expect(getByText('Benjamin Legrand')).toBeTruthy();
  });
});
