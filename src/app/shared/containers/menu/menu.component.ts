import { Component, inject } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

import { css } from '@styled-system/css';

import { MenuItem } from '../../components/menu-item/menu-item.component';

const MENU_HEIGHT = '50px';

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
    host: css({ userSelect: 'none' }),
    menu: css({
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '10',
      display: 'flex',
      alignItems: 'stretch',
      w: 'full',
      h: MENU_HEIGHT,
      bg: 'base/90',
      color: 'text',
      backdropBlur: 'md',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'base',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.25)',
    }),
    title: css({
      ml: MENU_HEIGHT,
      fontSize: '40px',
      lineHeight: '1',
      fontWeight: 'thin',
      color: 'text',
      whiteSpace: 'nowrap',
    }),
    items: css({
      position: 'relative',
      left: '0',
      right: '0',
      bottom: '0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
      w: 'full',
      gap: '5',
      p: '3',
      lineHeight: '1.5rem',
      fontFamily: 'title',
      fontWeight: 'bold',
      letterSpacing: 'widest',
      lgDown: {
        position: 'fixed',
        justifyContent: 'center',
        alignItems: 'stretch',
        w: 'full',
        bg: 'crust/80',
        backdropFilter: 'auto',
        backdropBlur: 'sm',
      },
    }),
    // also hides the `alt` text, which stays available to assistive tech
    gravatar: css({
      position: 'fixed',
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
    }),
  };
}
