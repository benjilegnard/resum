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
        src="/benjamin-legrand.png"
        alt="Benjamin Legrand's face"
      />
      <h1 class="menu-title">Benjamin Legrand</h1>
      <nav class="menu-items" *transloco="let t; read: 'ui.nav'">
        <bl-menu-item [routerLink]="[lang, 'articles']" [icon]="'article'">
          {{ t('articles') }}</bl-menu-item
        >
        <!--<bl-menu-item [routerLink]="['timeline']">{{ t('timeline') }}</bl-menu-item>-->
        <bl-menu-item [routerLink]="[lang, 'projects']" [icon]="'git-branch'">
          {{ t('projects') }}</bl-menu-item
        >
        <bl-menu-item [routerLink]="[lang, 'about']" [icon]="'info'">
          {{ t('about') }}</bl-menu-item
        >
      </nav>
    </header>
  `,
  styles: [
    `
      :root {
        --menu-border-size: 4px;
      }

      .menu {
        @apply fixed
        flex
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
        @apply ml-[70px]
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
          gap-4
          fixed
          left-0
          right-0
          bottom-0
          py-1
          font-title
          tracking-widest
          font-bold;

        @apply sm:bg-[rgba(200,200,200,0.5)] sm:text-black;

        @apply lg:bg-transparent lg:text-white lg:left-[35%] lg:top-[5px] lg:bottom-auto;
      }
      img.gravatar {
        @apply block
          w-16
          h-16
          rounded-full
          ring-inset ring-base
          fixed
          top-[-2px]
          left-[-2px]
          z-20
          transition-transform
          duration-300
          ease-in-out;
      }
      img.gravatar:hover {
        @apply rotate-180;
      }
      .hide-alt {
        @apply indent-[-100%] whitespace-nowrap overflow-hidden;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MenuItemComponent,
    RouterLink,
    SvgIconComponent,
    TranslocoDirective,
  ],
})
export class MenuComponent {
  protected readonly transloco = inject(TranslocoService);
  get lang(): string {
    return this.transloco.getActiveLang();
  }
}
