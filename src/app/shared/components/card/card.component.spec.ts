import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/angular';

import { Card } from './card.component';

describe('Card', () => {
  it('should create', async () => {
    const { container } = await render(Card);
    expect(container).toBeTruthy();
  });
});
