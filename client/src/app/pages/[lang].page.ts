import { RouteMeta } from '@analogjs/router';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AvailableLang, availableLangs } from '../shared/model';
import { map, tap } from 'rxjs';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';

export const routeMeta: RouteMeta = {
  /*
  canMatch: [
    (_route, segments) =>
      availableLangs.includes(segments[0].path as AvailableLang),
  ],
  */
 canMatch: [
    (route, segments) => {
      console.log(route, segments);
      return true;
    },

 ],
  canActivate: [
    (route) => {
      return availableLangs.includes(route.params['lang'] as AvailableLang);
    },
  ],
};

@Component({
  selector: 'bl-lang',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  template: `
    <router-outlet></router-outlet>
    <pre>{{ lang$ | async }}</pre>
  `,
  styles: [
    `
      pre {
        display: none;
      }
    `,
  ],
})
export class LangPageComponent {
  private readonly route = inject(ActivatedRoute);

  private document = inject<Document>(DOCUMENT);

  private readonly translate = inject(TranslocoService);

  readonly lang$ = this.route.paramMap.pipe(
    map((params) => params.get('lang') ?? 'en'),
    tap((lang) => this.translate.setActiveLang(lang)),
    tap((lang) => {
      this.document.documentElement.lang = lang;
    }),
  );
}

export default LangPageComponent;
