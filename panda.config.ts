import { defineConfig } from '@pandacss/dev';

/**
 * Catppuccin Mocha palette
 * Exposed as flat color tokens so styles read `bg: 'base'`, `color: 'text'`,
 * `borderColor: 'teal'`
 */
const catppuccinMocha = {
  rosewater: { value: '#f5e0dc' },
  flamingo: { value: '#f2cdcd' },
  pink: { value: '#f5c2e7' },
  mauve: { value: '#cba6f7' },
  red: { value: '#f38ba8' },
  maroon: { value: '#eba0ac' },
  peach: { value: '#fab387' },
  yellow: { value: '#f9e2af' },
  green: { value: '#a6e3a1' },
  teal: { value: '#94e2d5' },
  sky: { value: '#89dceb' },
  sapphire: { value: '#74c7ec' },
  blue: { value: '#89b4fa' },
  lavender: { value: '#b4befe' },
  text: { value: '#cdd6f4' },
  subtext1: { value: '#bac2de' },
  subtext0: { value: '#a6adc8' },
  overlay2: { value: '#9399b2' },
  overlay1: { value: '#7f849c' },
  overlay0: { value: '#6c7086' },
  surface2: { value: '#585b70' },
  surface1: { value: '#45475a' },
  surface0: { value: '#313244' },
  base: { value: '#1e1e2e' },
  mantle: { value: '#181825' },
  crust: { value: '#11111b' },
};

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{ts,html}'],
  exclude: [],
  outdir: 'styled-system',
  // no JSX runtime : styles are authored with `css()` / `cva()` and bound to [class]
  jsxFramework: undefined,

  theme: {
    extend: {
      tokens: {
        colors: catppuccinMocha,
        fonts: {
          sans: { value: "'Open Sans', sans-serif" },
          title: { value: "'Nunito', sans-serif" },
          mono: { value: "'Hack', monospace" },
        },
      },
    },
  },

  /**
   * Element-level defaults. These have to be global (not component-scoped)
   * because `<analog-markdown>` injects article HTML at runtime.
   */
  globalCss: {
    'html, :host': {
      '--global-font-body': 'token(fonts.sans)',
      '--global-font-mono': 'token(fonts.mono)',
    },
    'h1, h2, h3, h4, h5, h6': { fontFamily: 'title' },
    'h2, h3, h4, h5, h6': {
      textTransform: 'uppercase',
      letterSpacing: 'wider',
    },
    h2: { fontSize: '4xl', lineHeight: '4xl', my: '4' },
    h3: { fontSize: '3xl', lineHeight: '3xl', my: '4' },
    h4: { fontSize: '2xl', lineHeight: '2xl', my: '4' },
    h5: { fontSize: 'xl', lineHeight: 'xl', my: '4' },
    h6: { fontSize: 'lg', lineHeight: 'lg', my: '4' },
    'p, ul, ol': {
      my: '4',
      lineHeight: 'relaxed',
      fontFamily: 'sans',
      fontSize: 'xl',
    },
    ul: { listStyleType: 'disc', listStylePosition: 'inside' },
    ol: { listStyleType: 'decimal', listStylePosition: 'inside' },
    a: {
      color: 'sky',
      textDecoration: 'underline',
      textUnderlineOffset: '8px',
      _hover: { textUnderlineOffset: '4px' },
    },
    pre: { bg: 'base' },
    table: { w: 'full', textAlign: 'left', my: '4' },
    'table td, table th': {
      border: '1px solid',
      borderColor: 'surface0',
      borderCollapse: 'collapse',
      p: '2',
    },
    'table thead': { bg: 'crust' },
    'table tbody': { bg: 'mantle' },
    blockquote: {
      position: 'relative',
      w: '75%',
      mx: 'auto',
      my: '4',
      py: '2',
      px: '4',
      bg: 'crust',
      _after: {
        content: '"”"',
        position: 'absolute',
        right: '3',
        top: '1',
        fontSize: '4xl',
        color: 'surface1',
      },
    },
    'pre.shiki, .mermaid': { bg: 'base', w: '80%', mx: 'auto', p: '6' },
  },
});
