import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs';

@Component({
  selector: 'bl-menu',
  template: `
    <header class="menu">
      <img
        class="gravatar hide-alt"
        src="/benjamin-legrand.webp"
        alt="Benjamin Legrand's face"
        width="64"
        height="64"
      />
      <h1 class="menu-title">Benjamin Legrand</h1>
      <nav class="menu-items" *transloco="let t; read: 'ui.nav'">
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
  styles: [
    `
      :host {
        @apply select-none;
      }
      :root {
        --menu-border-size: 4px;
      }

      .menu {
        @apply fixed
        flex
        items-stretch
        top-0
        left-0
        right-0
        h-[50px]
        w-full
        z-10
        bg-base
        text-text
        border-b-[var(--menu-border-size)]
        border-teal
        shadow-[0_0_15px_rgba(0,0,0,0.25)];
      }

      .menu-title {
        @apply ml-[50px]
         text-[40px]
         leading-[50px]
         text-text
         font-thin
         whitespace-nowrap;
      }

      .menu-items {
        @apply leading-6
          flex
          flex-row
          w-full
          justify-end
          items-stretch
          gap-5
          relative
          left-0
          right-0
          bottom-0
          p-3
          font-title
          tracking-widest
          font-bold;

        @apply max-lg:fixed max-lg:backdrop-blur max-lg:bg-crust max-lg:w-full max-lg:items-stretch max-lg:justify-center;
      }
      img.gravatar {
        @apply block
          w-10
          h-10
          rounded-full
          fixed
          m-1
          z-20
          transition-transform
          duration-300
          ease-in-out;
      }
      .hide-alt {
        @apply indent-[-100%] whitespace-nowrap overflow-hidden;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuItemComponent, TranslocoDirective],
})
export class MenuComponent {
  protected readonly transloco = inject(TranslocoService);
  get lang(): string {
    return this.transloco.getActiveLang();
  }
}
