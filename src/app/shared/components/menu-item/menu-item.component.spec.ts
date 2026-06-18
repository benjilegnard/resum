import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';

import { MenuItemComponent } from './menu-item.component';
import { EnvironmentProviders, Provider } from '@angular/core';

describe('MenuItemComponent', () => {
  let providers: (Provider | EnvironmentProviders)[];
  beforeEach(() => {
    providers = [provideRouter([])];
  });

  it('should create', async () => {
    const { container } = await render(MenuItemComponent, { providers });
    expect(container).toBeTruthy();
  });
});
