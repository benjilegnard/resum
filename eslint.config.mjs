// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

// @ts-check
import js from '@eslint/js';
import ts from 'typescript-eslint';
import ng, { processInlineTemplates } from 'angular-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    files: ['**/*.ts'],
    ignores: ['dist/**', 'src/app/svg/**', 'styled-system/**'],
    extends: [
      js.configs.recommended,
      ...ts.configs.recommended,
      ...ts.configs.stylistic,
      ...ng.configs.tsRecommended,
      ...storybook.configs['flat/recommended'],
    ],
    processor: processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'bl',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'bl',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['src/**/*.html'],
    extends: [
      ...ng.configs.templateRecommended,
      ...ng.configs.templateAccessibility,
    ],
    rules: {},
  },
);
