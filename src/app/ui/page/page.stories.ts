import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Page } from './page';

const meta: Meta<Page> = {
  title: 'UI/Page',
  component: Page,
};
export default meta;
type Story = StoryObj<Page>;
export const Default: Story = {};
