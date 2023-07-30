import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bl-menu-item',
  template: `
    <a class="menu-item" [routerLink]="routerLink">
      <svg:svg class="menu-item-icon" width="32" height="32"></svg:svg>
      <span class="menu-item-text">
        <ng-content></ng-content>
      </span>
    </a>
  `,
  styles: [
    `
      @import 'variables';
      @import 'mixins';
      @import 'breakpoint-sass';

      .menu-item {
        font-size: 20px;
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
        width: 100%;
        text-decoration: none;
        align-items: center;

        @include breakpoint($large) {
          flex-direction: row;
        }
      }

      .menu-item-text {
        flex: 0 0 auto;
        color: #444;

        text-decoration: none;
        @include breakpoint($large) {
          color: white;
        }
      }

      .menu-item-icon {
        flex: 0 0 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
})
export class MenuItemComponent {
  @Input()
  routerLink: string[] = [];
}
