import { Component, inject } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

import { css } from '@styled-system/css';

import { MenuItem } from '../../components/menu-item/menu-item';

@Component({
  selector: 'bl-menu',
  imports: [MenuItem, TranslocoDirective],
  template: `
    <header [class]="styles.menu">
      <img
        [class]="styles.gravatar"
        src="/benjamin-legrand.webp"
        alt="Benjamin Legrand's face"
        width="64"
        height="64"
      />
      <div [class]="styles.title">Benjamin Legrand</div>
      <nav [class]="styles.items" *transloco="let t; prefix: 'ui.nav'">
        <bl-menu-item [link]="[lang, 'articles']" [icon]="'article'">
          {{ t('articles') }}</bl-menu-item
        >
        <bl-menu-item [link]="[lang, 'talks']" [icon]="'quotes'">
          {{ t('talks') }}</bl-menu-item
        >
        <!--<bl-menu-item [routerLink]="['timeline']">{{ t('timeline') }}</bl-menu-item>-->
        <bl-menu-item [link]="[lang, 'projects']" [icon]="'git-branch'">
          {{ t('projects') }}</bl-menu-item
        >
        <bl-menu-item [link]="[lang, 'about']" [icon]="'info'">
          {{ t('about') }}</bl-menu-item
        >
      </nav>
    </header>
  `,
  host: {
    '[class]': 'styles.host',
  },
})
export class Menu {
  protected readonly transloco = inject(TranslocoService);
  get lang(): string {
    return this.transloco.getActiveLang();
  }

  protected readonly styles = {
    host: css({
      userSelect: 'none',
      py: '6',
    }),
    menu: css({
      display: 'flex',
      // nav goes below the title on mobile
      flexDirection: 'column',
      alignItems: 'stretch',
      w: 'full',
      mx: 'auto',
      color: 'text',
      // same width as the `bl-page` content card
      md: {
        flexDirection: 'row',
        left: '6',
        right: '6',
        w: 'auto',
        maxW: '3xl',
      },
      lg: { maxW: '5xl' },
    }),
    title: css({
      ml: 'menu',
      fontSize: '40px',
      lineHeight: '1',
      fontWeight: 'thin',
      color: 'text',
      // wraps on mobile, single line once the menu is a row
      md: { whiteSpace: 'nowrap' },
    }),
    items: css({
      position: 'relative',
      left: '0',
      right: '0',
      bottom: '0',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      w: 'full',
      gap: '5',
      p: '3',
      lineHeight: '1.5rem',
      fontFamily: 'title',
      fontWeight: 'bold',
      letterSpacing: 'widest',
      md: { justifyContent: 'flex-end' },
    }),
    gravatar: css({
      position: 'absolute',
      zIndex: '20',
      display: 'block',
      w: '10',
      h: '10',
      m: '1',
      rounded: 'full',
      transition: 'transform',
      transitionDuration: '300ms',
      transitionTimingFunction: 'in-out',
      textIndent: '-100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'crust',
    }),
  };
}
