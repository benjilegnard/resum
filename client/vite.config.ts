/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      vite: {
        inlineStylesExtension: 'scss',
      },
      apiPrefix: 'api',
      prerender: {
        routes: async () => [
          '/',
          '/about',
          '/articles',
          '/timeline',
          '/projects',
          '/api/rss.xml',
        ],
        sitemap: {
          host: 'https://benjaminlegrand.net/',
        },
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['src/sass'],
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    coverage: { provider: 'v8' },
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
