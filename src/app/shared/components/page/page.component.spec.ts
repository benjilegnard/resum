import { Page } from './page.component';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/angular';

describe('Page', () => {
  it('should create', async () => {
    const { container } = await render(Page);
    expect(container).toBeTruthy();
  });
});
