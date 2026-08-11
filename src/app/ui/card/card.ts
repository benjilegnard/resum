import { Component } from '@angular/core';
import { css } from '@styled-system/css';

@Component({
  selector: 'bl-card',
  imports: [],
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'styles.card',
  },
})
export class Card {
  protected readonly styles = {
    card: css({ bg: 'base', boxShadow: 'lg', color: 'text', p: '2' }),
  };
}
