import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  // mirrors `publicDir: 'src/assets'` in vite.config.ts, so the `/fonts/*`
  // urls in the `@font-face` rules of src/styles.css resolve
  staticDirs: ['../src/assets'],
  framework: {
    name: '@storybook/angular-vite',
    options: {
      compodoc: false,
    },
  },
};
export default config;
