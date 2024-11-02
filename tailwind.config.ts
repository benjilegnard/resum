import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{html,ts,md,analog,ag}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      title: ['Nunito', 'sans-serif'],
      mono: ['Hack', 'monospace'],
    }
  },
  plugins: [
    require('@catppuccin/tailwindcss')({
      defaultFlavour: 'mocha',
    }),
  ],
} satisfies Config;
