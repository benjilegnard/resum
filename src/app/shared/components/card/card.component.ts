import { Component } from '@angular/core';

import { css } from '@styled-system/css';

@Component({
  selector: 'bl-card',
  template: `
    <div [class]="styles.card">
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
})
export class CardComponent {
  protected readonly styles = {
    card: css({ bg: 'base', m: '4', boxShadow: 'lg' }),
  };
}
