import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';

import { MenuComponent } from './menu.component';

import { getTranslocoModule } from '../../../transloco-testing.module';

describe('MenuComponent', () => {
  let providers: unknown[];
  let imports: unknown[];
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
