# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal resume / blog of Benjamin Legrand (https://benjaminlegrand.net), built as an
**AnalogJS** (Angular meta-framework on Vite) app, prerendered at build time and deployed
to **Cloudflare Workers**.

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml` for `overrides` / `allowBuilds`).

```bash
pnpm dev                       # ng serve on port 5173 (HMR)
pnpm build                     # prebuild runs `panda` + `svg` + `format`, then ng build
pnpm panda                     # regenerate styled-system/* from panda.config.ts
pnpm test                      # ng test -> @analogjs/vitest-angular (unit)
pnpm test:e2e                  # playwright test — needs browsers on the machine
pnpm test:e2e:docker           # same, with browsers from a docker container
pnpm lint                      # ng lint (eslint over **/*.ts + **/*.html)
pnpm format                    # prettier --write .
pnpm exec prettier --check .   # what CI enforces
pnpm svg                       # regenerate src/app/svg/* from src/assets/icons/*.svg
```

Single test file / pattern — use `--testFile` (the `@analogjs/vitest-angular` builder exposes
`testFiles` with the `testFile` alias; `--include`/`--includes` are rejected as unknown args).
The value is a Vitest path filter, so a substring works and the flag is repeatable:

```bash
pnpm exec ng test --testFile=card.component            # one spec
pnpm exec ng test --testFile=shared/components         # every spec under a folder
pnpm exec ng test --testFile=card --testFile=menu-item # several
pnpm exec ng test --watch                              # also --coverage, -u
```

CI (`.github/workflows/build-and-test.yml`) runs lint, prettier `--check`, build and unit
tests in parallel on every push to `main` and every PR; `playwright.yml` runs the e2e suite on
the same triggers. Push to `main` also triggers `deploy-to-prod.yml` (build with
`NITRO_PRESET=cloudflare`, then `wrangler deploy`).

## Architecture

### File-based routing (Analog)

Routes come from the filesystem under `src/app/pages/` via `provideFileRouter()` — there is no
route config file. Naming conventions matter:

- `[lang].page.ts` — dynamic segment; hosts a bare `<router-outlet>` plus `routeMeta` with the
  language guard/resolver, so **every localized route inherits it**.
- `[lang]/(home).page.ts` — parentheses mean "index route without adding a path segment".
- `[...not-found-page].component.ts` — catch-all.
- Each page file must `export default` its component.
- Per-route config (guards, resolvers, route-scoped providers) goes in an exported
  `routeMeta: RouteMeta` const in the same file.

`withComponentInputBinding()` is enabled, so route params arrive as component `@Input()`s.

### i18n (Transloco)

Language lives in the **URL** as the first segment: `/en/...`, `/fr/...`. `/` renders a language
picker (`pages/index.page.ts`).

- `availableLangs` (`src/app/shared/model/available-langs.ts`) is the single source of truth —
  adding a language means touching it, `transloco.config.js`, `src/assets/i18n/<lang>.json`,
  and the prerender route list in `vite.config.ts`.
- `available-lang.guard.ts` rejects unknown langs; `lang.resolver.ts` sets
  `document.documentElement.lang` and calls `TranslocoService.setActiveLang()`.
- Templates use the structural directive form: `*transloco="let t; prefix: 'ui.nav'"`.
- Tests import `getTranslocoModule()` from `src/app/transloco-testing.module.ts` (loads the real
  `en.json`/`fr.json`).

### Content (markdown)

Articles/projects are markdown files with front matter under `src/content/`:

- `src/content/articles/YYYY-MM-DD-<slug>.md`
- `src/content/projects/<slug>.md`, `src/content/experience/`

Front matter shape is typed in `src/app/shared/model/article-attributes.ts`
(`title`, `lang`, `slug`, `published`, `publishedAt`). **`published: true` and a matching `lang`
are required** for a file to be listed, prerendered, or in the RSS feed — the same
`published && lang` filter is reimplemented in three places:

1. `injectContentFiles()` in `(articles-list).page.ts` (list view, filtered by active lang)
2. `loadArticles()` in `vite.config.ts` (prerender route generation)
3. `parseArticles()` in `src/server/routes/rss.xml.ts` (feed)

Single articles use `injectContent({ param: 'articleSlug', subdirectory: 'articles' })`.
Rendering is `<analog-markdown>` with a **Shiki** highlighter (`catppuccin-mocha`) and lazy
`mermaid` for diagram fences.

### Server routes

`src/server/routes/` are Nitro/h3 handlers exposed under the `api` prefix
(`apiPrefix: 'api'`). Currently just `rss.xml.ts` → `/api/rss.xml`, which reads
`src/content/articles/` from disk at request/prerender time.

### Prerendering

`vite.config.ts` enumerates every prerendered route explicitly (home, per-lang pages, every
published article, `/api/rss.xml`) and emits a sitemap for `https://benjaminlegrand.net/`.
**A new page under `src/app/pages/` will not be prerendered unless it is added to that list.**

### SVG icons

Icons are authored as SVGs in `src/assets/icons/`, then compiled by `@ngneat/svg-generator`
(`pnpm svg`, also run in `prebuild`) into TS consts in `src/app/svg/` — which is **generated
code, eslint-ignored, do not hand-edit**. Register icons where they are used via
`provideSvgIcons([...])`, either globally in `app.config.ts` or route-scoped in `routeMeta.providers`.

### Styling (Panda CSS)

Styles are authored in TypeScript with **Panda CSS** and bound to `[class]`. There is no
`@apply`, no `styles` array on components, and no utility classes written by hand in templates.

- `panda.config.ts` holds the theme. The **Catppuccin Mocha** palette is defined there as flat
  color tokens, so styles read `bg: 'base'`, `color: 'text'`, `borderColor: 'teal'`, …
  Everything else (spacing, `fontSizes`, `radii`, `shadows`, breakpoints) comes from
  `@pandacss/preset-panda`, whose scales match the Tailwind ones this project used before.
- Element-level defaults (`h1`–`h6`, `p`, `ul`, `a`, `table`, `blockquote`, `pre.shiki`,
  `.mermaid`) are `globalCss` in that same file. They **must** stay global because
  `<analog-markdown>` injects article HTML at runtime.
- `src/styles.css` is only the `@layer reset, base, tokens, recipes, utilities;` declaration
  Panda's PostCSS plugin injects into, plus the `@font-face` rules.
- In components: `css({...})` for a single element, `cva({ base, variants })` when an element has
  mutually exclusive looks (see the gradient variants in `page.component.ts`). Collect them in a
  `protected readonly styles = { … }` object and reference `styles.foo` from the template.
- Host styling uses a `host: { '[class]': 'styles.host' }` binding — Panda emits into the global
  stylesheet, so view encapsulation is irrelevant.
- Import from the `@styled-system/*` path alias, e.g. `import { css } from '@styled-system/css'`.
- `styled-system/` is **generated** (`pnpm panda`, also run by `prepare` and `prebuild`) and is
  git-ignored, prettier-ignored and eslint-ignored. Never hand-edit it. After changing
  `panda.config.ts`, re-run `pnpm panda` so the token types refresh.
- Responsive/state styles are nested conditions: `lg: {...}`, `lgDown: {...}` (the former
  `max-lg:`), `_hover: {...}`, `_focus: {...}`, `_after: {...}`.

## Conventions

- Component/directive selector prefix `bl-` / `bl` (enforced by eslint).
- Components are standalone, **inline template**, `ChangeDetectionStrategy.OnPush`
  (see the `@schematics/angular:component` defaults in `angular.json`).
- Styling is **Panda CSS** — see the dedicated section below. Components have **no `styles`
  array** and no separate `.scss` files.
- **Zoneless** change detection (`provideZonelessChangeDetection()`); SSR hydration with event
  replay.
- Import shared code through the path alias `@benjilegnard/resum/shared/*` → `src/app/shared/*`.
- `src/app/shared/components/` = presentational, `containers/` = connected/stateful.
- TS is strict, plus `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, and Angular
  `strictTemplates`.

## Tests

### Unit

Vitest + jsdom + `@testing-library/angular` (`render`, not `TestBed` directly). Specs sit next to
their subject as `*.spec.ts`; setup is `src/test-setup.ts`. `e2e/**` is excluded from the Vitest
`include` in `vite.config.ts`, so the two suites never overlap.

### End-to-end (Playwright)

Specs live in `e2e/*.spec.ts`, config is `playwright.config.ts` (chromium / firefox / webkit).
`webServer` boots `pnpm run start` on port 5173 automatically and reuses an already-running dev
server outside CI.

Two ways to run, depending on whether browsers are available on the machine:

- **`pnpm test:e2e`** — plain `playwright test`, uses locally installed browsers (i.e. after a
  `pnpm exec playwright install`, or a global Playwright install).
- **`pnpm test:e2e:docker`** — no local browsers needed. `scripts/playwright-docker.sh` starts
  `mcr.microsoft.com/playwright:v<version>-noble` running `playwright run-server`, then runs the
  suite against it via `PW_TEST_CONNECT_WS_ENDPOINT`. Requires docker.

Extra args are forwarded to `playwright test` in both cases:
`pnpm test:e2e:docker --project=chromium`.

**The client and the browser server must be the exact same Playwright version** — a mismatch
fails with `428 Precondition Required` (remote) or `Executable doesn't exist at /ms-playwright/…`
(container image). The shell script derives the version from the installed `@playwright/test`, so
it can never drift; the `container.image` tag in `.github/workflows/playwright.yml` is evaluated
before any step runs and therefore **must be bumped by hand** whenever the lockfile moves.

When connecting to a containerized browser, the dev server still runs on the **host**: the script
passes `--add-host=hostmachine:host-gateway`, `playwright.config.ts` switches `baseURL` to
`http://hostmachine:5173`, and `vite.config.ts` flips `server.host` to `0.0.0.0` plus
`allowedHosts: ['hostmachine']` — all three keyed off `PW_TEST_CONNECT_WS_ENDPOINT` being set.
