# Resum

My personal resume / site / blog — https://benjaminlegrand.net

A single [AnalogJS](https://analogjs.org) application (Angular on Vite), fully prerendered at
build time.

## Tech stack

- **Angular 22** — standalone, zoneless, SSR + hydration
- **AnalogJS** — file-based routing (`src/app/pages/`), markdown content, Nitro server routes
- **Tailwind CSS** with the [Catppuccin](https://github.com/catppuccin/tailwindcss) Mocha palette
- **Transloco** for i18n (English / French, language is the first URL segment)
- **Vitest** + Testing Library for unit tests

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
pnpm lint           # eslint
pnpm format         # prettier --write .
pnpm svg            # regenerate icon components from src/assets/icons/
```

Run a single spec with `pnpm exec ng test --testFile=<path or substring>`.
