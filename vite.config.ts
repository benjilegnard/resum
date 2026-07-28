/// <reference types="vitest" />

import { defineConfig, type Plugin } from 'vite';
import analog from '@analogjs/platform';
import {
  ArticleAttributes,
  AvailableLang,
} from '@benjilegnard/resum/shared/model';
import { readFileSync, readdirSync } from 'fs';
import { dirname, resolve } from 'path';
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
    .filter((attributes) => attributes.published === true && attributes.slug)
    .filter((attributes) => `/${attributes.lang}` === lang)
    .map((attributes) => `${lang}/articles/${attributes.slug}`);
}

/**
 * `@angular/platform-server` ships `fesm2022/*.mjs.map` files whose `sources` array holds the
 * source *text* instead of file paths, with no `sourcesContent`. Analog keeps that package
 * `noExternal` for SSR (it rewrites `ngServerMode`), so Vite reads those maps on every dev/SSR
 * request and floods the console with `Sourcemap for "…" points to a source file outside its
 * package` / `points to missing source files`.
 *
 * Vite only reads the sidecar `.map` when no plugin `load` hook returns the module, so we load
 * the file ourselves with `map: null`. The map is unusable anyway. Shape-checked, so this stops
 * kicking in as soon as the upstream packaging is fixed.
 */
function dropBrokenAngularSourcemaps(): Plugin {
  const CANDIDATE = /@angular[\\/]platform-server[\\/]fesm2022[\\/][^?]*\.mjs$/;
  const SOURCE_MAPPING_URL = /\/\/# sourceMappingURL=([^\s'"]+)[ \t]*$/m;

  function isBroken(mapPath: string): boolean {
    try {
      const map = JSON.parse(readFileSync(mapPath, 'utf8'));
      return (
        !Array.isArray(map.sourcesContent) &&
        (map.sources as unknown[]).some(
          (source) => typeof source === 'string' && source.includes('\n'),
        )
      );
    } catch {
      return false;
    }
  }

  return {
    name: 'resum-drop-broken-angular-sourcemaps',
    enforce: 'pre',
    load(id) {
      const file = id.split('?')[0];
      if (!CANDIDATE.test(file)) {
        return null;
      }

      let code: string;
      try {
        code = readFileSync(file, 'utf8');
      } catch {
        return null;
      }

      const match = SOURCE_MAPPING_URL.exec(code);
      if (
        !match ||
        match[1].startsWith('data:') ||
        !isBroken(resolve(dirname(file), match[1]))
      ) {
        return null;
      }

      return { code: code.replace(SOURCE_MAPPING_URL, ''), map: null };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  server: {
    exclude: [
      'test-results',
      'playwright-report',
      'coverage',
      'e2e',
      'scripts',
    ],
    host: process.env['PW_TEST_CONNECT_WS_ENDPOINT'] ? '0.0.0.0' : '127.0.0.1',
    allowedHosts: process.env['PW_TEST_CONNECT_WS_ENDPOINT']
      ? ['hostmachine']
      : undefined,
  },
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    tsconfigPaths: true,
  },
  plugins: [
    dropBrokenAngularSourcemaps(),
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
            skipLangs: ['mermaid'],
          },
        },
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    coverage: { provider: 'v8' },
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
