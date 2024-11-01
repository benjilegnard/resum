import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { availableLangGuard } from '../shared/i18n/available-lang.guard';
import { langResolver } from '../shared/i18n/lang.resolver';

export const routeMeta: RouteMeta = {
  canActivate: [availableLangGuard],
  resolve: {
    lang: langResolver,
  },
};

@Component({
  selector: 'bl-lang',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: [``],
})
export class LangPageComponent {}

export default LangPageComponent;
