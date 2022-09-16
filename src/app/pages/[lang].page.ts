import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { availableLangGuard } from '../shared/i18n/available-lang.guard';
import { langResolver } from '../shared/i18n/lang.resolver';
import { transition, trigger } from '@angular/animations';
import { leftToRightAnimation, rightToLeftAnimation } from '../app.animations';

export const routeMeta: RouteMeta = {
  canActivate: [availableLangGuard],
  resolve: {
    lang: langResolver,
  },
  data: { animation: 'ParentPage' },
};

@Component({
  selector: 'bl-lang',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  styles: [``],
  animations: [
    trigger('routeAnimations', [
      transition('ParentPage => ChildPage', leftToRightAnimation),
      transition('ChildPage => ParentPage', rightToLeftAnimation),
      transition('* => *', leftToRightAnimation),
    ]),
  ],
})
export class LangPageComponent {
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}

export default LangPageComponent;
