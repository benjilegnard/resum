import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent, SvgIcons } from '@ngneat/svg-icon';

import { css } from '@styled-system/css';

@Component({
  selector: 'bl-menu-item',
  template: `
    <a [class]="styles.link" [routerLink]="link">
      <svg-icon
        [class]="styles.icon"
        [fontSize]="iconSize"
        [key]="icon"
      ></svg-icon>
      <span [class]="styles.text">
        <ng-content></ng-content>
      </span>
    </a>
  `,
  host: {
    '[class]': 'styles.host',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SvgIconComponent],
})
export class MenuItemComponent {
  @Input()
  link: string[] = [];

  @Input()
  icon!: SvgIcons;

  protected iconSize = '20px';

  protected readonly styles = {
    host: css({ display: 'flex', w: 'auto' }),
    link: css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      w: 'full',
      gap: '3',
      px: '2',
      rounded: 'lg',
      textTransform: 'uppercase',
      textDecoration: 'none',
      lg: { flexDirection: 'row' },
      _hover: { bg: 'surface0' },
      _focus: { bg: 'surface0' },
    }),
    text: css({ flex: '1', color: 'text', textDecoration: 'none' }),
    icon: css({ flex: 'none', color: 'text' }),
  };
}
