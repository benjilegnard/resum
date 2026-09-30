import { Component, Input } from '@angular/core';

import { css } from '@styled-system/css';

/**
 * Page is a wrapper component, provide the background and the content card
 */
@Component({
  selector: 'bl-page',
  template: `
    <main [class]="styles.container">
      @if (title) {
        <h2>{{ title }}</h2>
      }
      <section [class]="styles.page">
        <ng-content></ng-content>
      </section>
    </main>
  `,
  imports: [],
})
export class Page {
  /**
   * Set page title.
   */
  @Input()
  public title!: string;

  protected readonly styles = {
    container: css({
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      pb: '68px',
      minH: '100vh',
      bg: 'surface0',
      color: 'text',
    }),
    page: css({
      w: 'full',
      h: 'full',
      flex: 'none',
      justifySelf: 'center',
      m: '0',
      p: '6',
      bg: 'mantle',
      color: 'text',
      boxShadow: 'lg',
      md: { maxW: '3xl' },
      lg: { maxW: '5xl' },
    }),
  };
}
