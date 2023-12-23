/// <reference types="vitest" />

import { defineConfig, searchForWorkspaceRoot } from 'vite';
import analog from '@analogjs/platform';
import {
  ArticleAttributes,
  AvailableLang,
} from '@benjilegnard/resum/shared/model';
import { readFileSync, readdirSync } from 'fs';
import fm from 'front-matter';

function loadArticles(lang: AvailableLang): string[] {
  return readdirSync(`src/content/articles/`)
    .map((filePath) => {
      const fileContents = readFileSync(
        `src/content/articles/${filePath}`,
        'utf8',
      );
      const frontMatter = fm(fileContents);
      return frontMatter.attributes as unknown as ArticleAttributes;
    })
    .filter((attributes) => `/${attributes.lang}` === lang)
    .map((attributes) => `${lang}/articles/${attributes.slug}`);
}

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
          ...['/en', '/fr'].flatMap((lang) => [
            `${lang}`,
            `${lang}/about`,
            `${lang}/articles`,
            ...loadArticles(lang),
            `${lang}/timeline`,
            `${lang}/projects`,
          ]),

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
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
      ],
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
