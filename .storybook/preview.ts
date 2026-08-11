import type { Preview } from '@storybook/angular-vite';

import { css } from '@styled-system/css';

/**
 * Same entry point as `index.html`: the `@layer` declaration Panda's PostCSS
 * plugin injects into (reset, tokens, `globalCss`, utilities) plus the
 * `@font-face` rules.
 */
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        //color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'mocha',
      values: [
        {
          name: 'mocha',
          value: '#313244',
        },
      ],
    },
  },

  decorators: [
    (story) => ({
      ...story(),
      template: `<div class="${css({
        bg: 'surface0',
        color: 'text',
      })}">${story().template ?? ''}</div>`,
    }),
  ],
};

export default preview;
