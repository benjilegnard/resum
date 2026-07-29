import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';

import { MenuItem } from './menu-item';
import { EnvironmentProviders, Provider } from '@angular/core';

describe('MenuItem', () => {
  let providers: (Provider | EnvironmentProviders)[];
  beforeEach(() => {
    providers = [provideRouter([])];
  });

  it('should create', async () => {
    const { container } = await render(MenuItem, { providers });
    expect(container).toBeTruthy();
  });
});
