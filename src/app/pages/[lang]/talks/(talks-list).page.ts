import { injectContentFiles } from '@analogjs/content';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

import { TalkAttributes } from '@benjilegnard/resum/shared/model';

@Component({
  selector: 'bl-talks',
  template: `
    <ng-container *transloco="let t; prefix: 'talks'">
      <h2>{{ t('title') }}</h2>
      <ul>
        @for (talk of talks; track talk.slug) {
          <li>
            <a [routerLink]="talk.slug">{{ talk.attributes.title }}</a>
          </li>
        }
      </ul>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslocoDirective],
})
export class TalksPageComponent {
  private readonly transloco = inject(TranslocoService);

  readonly talks = injectContentFiles<TalkAttributes>((contentFile) =>
    contentFile.filename.includes('src/content/talks/'),
  )
    .filter((content) => content.attributes.published)
    .filter(
      (content) => content.attributes.lang === this.transloco.getActiveLang(),
    );
}

export default TalksPageComponent;
