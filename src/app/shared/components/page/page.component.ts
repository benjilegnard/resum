import { Component, OnInit, Input } from '@angular/core';

import { css, cva } from '@styled-system/css';

const BACKGROUNDS = [
  'blue',
  'yellow',
  'orange',
  'pink',
  'green',
  'purple',
  'blue-green',
] as const;

const pageContainer = cva({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    pt: '50px',
    pb: '68px',
    minH: '100vh',
    bg: 'surface0',
    color: 'text',
  },
  variants: {
    background: {
      blue: {
        bgGradient: 'to-br',
        gradientFrom: '#f4c8dc',
        gradientVia: '#d0d3ed',
        gradientTo: '#addeff',
      },
      yellow: {
        bgGradient: 'to-br',
        gradientFrom: '#f2d7ec',
        gradientVia: '#f8ead8',
        gradientTo: '#ffffc4',
      },
      orange: {
        bgGradient: 'to-br',
        gradientFrom: '#ffffb5',
        gradientVia: '#ffe8a4',
        gradientTo: '#ffd093',
      },
      pink: {
        bgGradient: 'to-br',
        gradientFrom: '#ffb5dc',
        gradientVia: '#d8d2db',
        gradientTo: '#b4eddb',
      },
      green: {
        bgGradient: 'to-br',
        gradientFrom: '#b4eddb',
        gradientVia: '#cccec2',
        gradientTo: '#e4efaa',
      },
      purple: {
        bgGradient: 'to-br',
        gradientFrom: '#f5ccba',
        gradientVia: '#d8c1c6',
        gradientTo: '#c0b8d1',
      },
      'blue-green': {
        bgGradient: 'to-br',
        gradientFrom: '#99c4e5',
        gradientVia: '#b8ddc4',
        gradientTo: '#d9f7a3',
      },
    },
  },
});

/**
 * Page is a wrapper component, provide the gradient and white background
 */
@Component({
  selector: 'bl-page',
  template: `
    <main [class]="containerClass">
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
export class PageComponent implements OnInit {
  /**
   * Set page title.
   */
  @Input()
  public title!: string;

  /**
   * Classes for the randomly picked `pageContainer` gradient variant.
   */
  protected containerClass = '';

  protected readonly styles = {
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
      md: { m: '6', maxW: '3xl' },
      lg: { maxW: '5xl' },
    }),
  };

  ngOnInit() {
    const randomIndex = Math.floor(Math.random() * BACKGROUNDS.length);
    this.containerClass = pageContainer({
      background: BACKGROUNDS[randomIndex],
    });
  }
}
