# Resum

My personal resume / site / blog — https://benjaminlegrand.net

A single [AnalogJS](https://analogjs.org) application (Angular on Vite), fully prerendered at
build time.

## Tech stack

- **Angular 22** — standalone, zoneless, SSR + hydration
- **AnalogJS** — file-based routing (`src/app/pages/`), markdown content, Nitro server routes
- **Tailwind CSS** with the [Catppuccin](https://github.com/catppuccin/tailwindcss) Mocha palette
- **Transloco** for i18n (English / French, language is the first URL segment)
- **Vitest** + Testing Library for unit tests, **Playwright** for end-to-end tests

Blog posts and projects are markdown files with front matter under `src/content/`. An RSS feed is
served at `/api/rss.xml`.

## Getting started

Requires Node.js 24 and pnpm 11.

```bash
pnpm install
pnpm dev            # http://localhost:5173
```

## Scripts

```bash
pnpm dev            # dev server with HMR
pnpm build          # prerendered production build into dist/
pnpm test           # unit tests
pnpm test:e2e       # end-to-end tests (browsers installed locally)
pnpm test:e2e:docker # end-to-end tests (browsers from a docker container)
pnpm lint           # eslint
pnpm format         # prettier --write .
pnpm svg            # regenerate icon components from src/assets/icons/
```

Run a single spec with `pnpm exec ng test --testFile=<path or substring>`.

## End-to-end tests

Playwright specs live in `e2e/`, and run against chromium, firefox and webkit. The dev server is
started automatically, so no need to have one running.

`pnpm test:e2e` expects the browsers to be present on the machine — install them once with
`pnpm exec playwright install`, or use a global Playwright install.

`pnpm test:e2e:docker` needs no local browsers, only docker: it starts the official Playwright
image as a browser server and runs the suite against it. The image tag is derived from the
installed `@playwright/test` version, so it always matches.

Both forward extra arguments to `playwright test`:

```bash
pnpm test:e2e:docker --project=chromium
```
