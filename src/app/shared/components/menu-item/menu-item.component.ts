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
      :host {
        @apply flex w-auto;
      }

      .menu-item {
        @apply text-2xl uppercase flex flex-col w-full no-underline items-center gap-2 lg:flex-row;
      }

      .menu-item-text {
        @apply flex-none text-text no-underline;
      }

      .menu-item-icon {
        @apply flex-none text-text;
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
