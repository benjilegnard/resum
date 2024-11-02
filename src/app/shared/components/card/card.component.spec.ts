import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/angular';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  it('should create', async () => {
    const { container } = await render(CardComponent);
    expect(container).toBeTruthy();
  });
});
