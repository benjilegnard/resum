import {
  AnimationMetadata,
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/containers/menu/menu.component';

const timings = '0.25s ease-in-out';

const leftToRightAnimation: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(100%)' }),
        animate(timings, style({ transform: 'translateX(0%)' })),
      ],
      { optional: true },
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate(timings, style({ transform: 'translateX(-100%)' })),
      ],
      { optional: true },
    ),
  ]),
];
const rightToLeftAnimation: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-100%)' }),
        animate(timings, style({ transform: 'translateX(0%)' })),
      ],
      { optional: true },
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate(timings, style({ transform: 'translateX(100%)' })),
      ],
      { optional: true },
    ),
  ]),
];

@Component({
  selector: 'bl-root',
  template: `
    <bl-menu></bl-menu>
    <main
      [@routeAnimations]="prepareRoute(outlet)"
      class="{{ backgroundClass }}"
    >
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  styles: [
    `
      @import '_mixins';
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
      }
      main {
        height: auto;
        min-height: 100%;
      }
      .blue {
        @include diagonal-gradient(#d0d3ed, #addeff, #f4c8dc);
      }
      .yellow {
        @include diagonal-gradient(#f8ead8, #ffffc4, #f2d7ec);
      }
      .orange {
        @include diagonal-gradient(#ffe8a4, #ffd093, #ffffb5);
      }
      .pink {
        @include diagonal-gradient(#d8d2db, #b4eddb, #ffb5dc);
      }
      .green {
        @include diagonal-gradient(#cccec2, #e4efaa, #b4eddb);
      }
      .purple {
        @include diagonal-gradient(#d8c1c6, #c0b8d1, #f5ccba);
      }

      .blue-green {
        @include diagonal-gradient(#b8ddc4, #d9f7a3, #99c4e5);
      }
    `,
  ],
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  animations: [
    trigger('routeAnimations', [
      transition('ParentPage => ChildPage', leftToRightAnimation),
      transition('ChildPage => ParentPage', rightToLeftAnimation),
      transition('* => *', leftToRightAnimation),
    ]),
  ],
})
export class AppComponent implements OnInit {
  /**
   * name of random class (linked to classes in page.component.scss)
   */
  public backgroundClass!: string;

  ngOnInit() {
    // pick a random class
    const values = [
      'blue',
      'yellow',
      'orange',
      'pink',
      'green',
      'purple',
      'blue-green',
    ];
    const randomIndex = Math.floor(Math.random() * values.length);
    this.backgroundClass = values[randomIndex];
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
