import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent, SvgIcons } from '@ngneat/svg-icon';
import { SvgIconType } from '@ngneat/svg-icon/lib/providers';

@Component({
  selector: 'bl-menu-item',
  template: `
    <a class="menu-item" [routerLink]="routerLink">
      <svg-icon
        class="menu-item-icon"
        [fontSize]="iconSize"
        [key]="icon"
      ></svg-icon>
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

      :host {
        flex: 1 1 auto;
        display: flex;
        width: auto;
      }

      .menu-item {
        font-size: 20px;
        text-transform: uppercase;
        display: flex;
        flex-direction: column;
        width: 100%;
        text-decoration: none;
        align-items: center;
        gap: 8px;
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
        @include breakpoint($large) {
          color: white;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, SvgIconComponent],
})
export class MenuItemComponent {
  @Input()
  routerLink: string[] = [];

  @Input()
  icon!: SvgIcons;

  protected iconSize: string = '20px';
}
