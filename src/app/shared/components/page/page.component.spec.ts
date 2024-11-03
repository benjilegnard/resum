import { PageComponent } from './page.component';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/angular';

describe('PageComponent', () => {
  it('should create', async () => {
    const { container } = await render(PageComponent);
    expect(container).toBeTruthy();
  });
});
