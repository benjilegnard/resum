
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent, SvgIcons } from '@ngneat/svg-icon';
import { SvgIconType } from '@ngneat/svg-icon/lib/providers';

@Component({
  selector: 'bl-menu-item',
  template: `
    <a class="menu-item" [routerLink]="link">
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
        @apply uppercase flex flex-col w-full no-underline items-center gap-3 rounded-lg px-2 lg:flex-row hover:bg-surface0 focus:bg-surface0;
      }

      .menu-item-text {
        @apply flex-1 text-text no-underline;
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
  link: string[] = [];

  @Input()
  icon!: SvgIcons;

  protected iconSize: string = '20px';
}
