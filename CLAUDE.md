# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal resume / blog of Benjamin Legrand (https://benjaminlegrand.net), built as an
**AnalogJS** (Angular meta-framework on Vite) app, prerendered at build time and deployed
to **Cloudflare Workers**.

Note: `README.md` is stale — it describes an older three-module architecture (Angular client +
PHP GraphQL server + MariaDB). None of that exists anymore; this is a single Angular/Analog app.

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml` for `overrides` / `allowBuilds`).

```bash
pnpm dev                       # ng serve on port 5173 (HMR)
pnpm build                     # prebuild runs `svg` + `format`, then ng build
pnpm test                      # ng test -> @analogjs/vitest-angular
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
tests in parallel on every push to `main` and every PR. Push to `main` also triggers
`deploy-to-prod.yml` (build with `NITRO_PRESET=cloudflare`, then `wrangler deploy`).

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

## Conventions

- Component/directive selector prefix `bl-` / `bl` (enforced by eslint).
- Components are standalone, **inline template + inline styles**, `ChangeDetectionStrategy.OnPush`
  (see the `@schematics/angular:component` defaults in `angular.json`).
- Styling is **Tailwind `@apply` inside the component's inline `styles`** — not utility classes
  in the template, and not separate `.scss` files. Palette is Catppuccin Mocha
  (`bg-base`, `bg-mantle`, `text-text`, `border-teal`, …) via `@catppuccin/tailwindcss`.
- **Zoneless** change detection (`provideZonelessChangeDetection()`); SSR hydration with event
  replay.
- Import shared code through the path alias `@benjilegnard/resum/shared/*` → `src/app/shared/*`.
- `src/app/shared/components/` = presentational, `containers/` = connected/stateful.
- TS is strict, plus `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, and Angular
  `strictTemplates`.

## Tests

Vitest + jsdom + `@testing-library/angular` (`render`, not `TestBed` directly). Specs sit next to
their subject as `*.spec.ts`; setup is `src/test-setup.ts`.
