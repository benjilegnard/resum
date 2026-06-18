/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { AvailableLang } from '@benjilegnard/resum/shared/model';
import { readFileSync, readdirSync } from 'fs';
import fm from 'front-matter';

interface PrerenderContentAttributes {
  lang: AvailableLang;
  published?: boolean;
  slug?: string;
}

function loadContentRoutes(
  contentType: 'articles' | 'talks',
  lang: AvailableLang,
): string[] {
  return readdirSync(`src/content/${contentType}/`)
    .map((filePath) => {
      const fileContents = readFileSync(
        `src/content/${contentType}/${filePath}`,
        'utf8',
      );
      const frontMatter = fm(fileContents);
      return frontMatter.attributes as unknown as PrerenderContentAttributes;
    })
    .filter((attributes) => attributes.published === true && attributes.slug)
    .filter((attributes) => attributes.lang === lang)
    .map((attributes) => `/${lang}/${contentType}/${attributes.slug}`);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    tsconfigPaths: true,
  },
  plugins: [
    analog({
      content: {
        highlighter: 'shiki',
        shikiOptions: {
          highlight: {
            theme: 'catppuccin-mocha',
          },
          highlighter: {
            // add more languages
            additionalLangs: ['mermaid', 'bash', 'lua', 'angular-ts'],
          },
        },
      },
      apiPrefix: 'api',
      prerender: {
        routes: async () => [
          '/',
          ...(['en', 'fr'] satisfies AvailableLang[]).flatMap((lang) => [
            `/${lang}`,
            `/${lang}/about`,
            `/${lang}/articles`,
            ...loadContentRoutes('articles', lang),
            `/${lang}/talks`,
            ...loadContentRoutes('talks', lang),
            `/${lang}/timeline`,
            `/${lang}/projects`,
          ]),
          '/api/rss.xml',
        ],
        sitemap: {
          host: 'https://benjaminlegrand.net/',
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    coverage: { provider: 'v8' },
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
