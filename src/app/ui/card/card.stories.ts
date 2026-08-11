import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Card } from './card';

const meta: Meta<Card> = {
  title: 'UI/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<Card>;

export const Default: Story = {
  render: () => ({ template: `<bl-card>Test</bl-card>` }),
};
