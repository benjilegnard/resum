import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { withComponentInputBinding } from '@angular/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { provideSvgIcons } from '@ngneat/svg-icon';

import { articleIcon } from './svg/article';
import { gitBranchIcon } from './svg/git-branch';
import { infoIcon } from './svg/info';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(withComponentInputBinding()),
    provideContent(
      withMarkdownRenderer({ loadMermaid: () => import('mermaid') }),
    ),
    provideHttpClient(),
    provideClientHydration(),
    provideSvgIcons([articleIcon, gitBranchIcon, infoIcon]),
  ],
};
