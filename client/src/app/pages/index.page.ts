import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { PageComponent } from '../shared/components/page/page.component';

export const routeMeta: RouteMeta = {
  data: { animation: 'ParentPage' },
};

@Component({
  selector: 'bl-home',
  standalone: true,
  template: `
    <bl-page>
      <h2>Welcome, my name is Benjamin Legrand</h2>

      <h3>I am a fullstack developer at most!</h3>
    </bl-page>
  `,
  imports: [PageComponent],
  styles: [``],
})
export class HomePageComponent {}

export default HomePageComponent;
