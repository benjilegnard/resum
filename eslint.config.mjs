// @ts-check
import js from '@eslint/js';
import ts from 'typescript-eslint';
import ng, { processInlineTemplates } from 'angular-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    files: ['**/*.ts'],
    ignores: ['dist/**', 'src/app/svg/**', 'tailwind.config.ts'],
    extends: [
      js.configs.recommended,
      ...ts.configs.recommended,
      ...ts.configs.stylistic,
      ...ng.configs.tsRecommended,
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
