import {
  AnimationMetadata,
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/containers/menu/menu.component';
import { leftToRightAnimation, rightToLeftAnimation } from './app.animations';

@Component({
  selector: 'bl-root',
  template: `
    <bl-menu></bl-menu>
    <main

      class="{{ backgroundClass }}"
    >
      <router-outlet #outlet="outlet" [@routeAnimations]="prepareRoute(outlet)"></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        @apply flex flex-col h-screen;
      }
      main {
        height: auto;
        min-height: 100%;
      }

      .blue {
        @apply bg-gradient-to-br via-[#d0d3ed] to-[#addeff] from-[#f4c8dc];
      }
      .yellow {
        @apply bg-gradient-to-br via-[#f8ead8] to-[#ffffc4] from-[#f2d7ec];
      }
      .orange {
        @apply bg-gradient-to-br via-[#ffe8a4] to-[#ffd093] from-[#ffffb5];
      }
      .pink {
        @apply bg-gradient-to-br via-[#d8d2db] to-[#b4eddb] from-[#ffb5dc];
      }
      .green {
        @apply bg-gradient-to-br via-[#cccec2] to-[#e4efaa] from-[#b4eddb];
      }
      .purple {
        @apply bg-gradient-to-br via-[#d8c1c6] to-[#c0b8d1] from-[#f5ccba];
      }
      .blue-green {
        @apply bg-gradient-to-br via-[#b8ddc4] to-[#d9f7a3] from-[#99c4e5];
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
