import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { withComponentInputBinding } from '@angular/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withShikiHighlighter } from '@analogjs/content/shiki-highlighter';
import { provideSvgIcons } from '@ngneat/svg-icon';

import { articleIcon } from './svg/article';
import { gitBranchIcon } from './svg/git-branch';
import { infoIcon } from './svg/info';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { availableLangs } from './shared/model';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(withComponentInputBinding()),
    provideContent(
      withMarkdownRenderer({ loadMermaid: () => import('mermaid') }),
      withShikiHighlighter(),
    ),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideSvgIcons([articleIcon, gitBranchIcon, infoIcon]),
    provideTransloco({
      config: {
        availableLangs,
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
