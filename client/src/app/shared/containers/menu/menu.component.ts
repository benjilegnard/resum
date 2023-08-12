import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';

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
      <nav class="menu-items">
        <bl-menu-item [routerLink]="['articles']">Articles</bl-menu-item>
        <!--<bl-menu-item [routerLink]="['timeline']">Experience</bl-menu-item>-->
        <bl-menu-item [routerLink]="['projects']">Projects</bl-menu-item>
        <bl-menu-item [routerLink]="['about']">About</bl-menu-item>
      </nav>
    </header>
  `,
  styles: [
    `
      @import 'mixins';
      @import 'variables';
      @import 'breakpoint-sass';

      :root {
        --menu-border-size: 4px;
      }
      .menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        color: var(--text);
        background: var(--base);
        width: 100%;
        z-index: 1;

        border-bottom: var(--menu-border-size) solid var(--surface0);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);

        h1 {
          margin-left: 70px;
          font-size: 40px;
          line-height: 50px;
          color: white;
          font-weight: 100;
          text-shadow: 0 0 5px black;
          white-space: nowrap;
        }
      }
      .menu-items {
        line-height: 25px;
        display: flex;
        flex-direction: row;
        position: fixed;
        left: 0;
        right: 0;
        top: auto;
        bottom: 0;
        padding: 5px 0;
        font-family: 'Nunito';
        letter-spacing: 0.2em;
        font-weight: bold;

        @include breakpoint($small) {
          background: rgba(200, 200, 200, 0.5);
          color: black;
        }
        @include breakpoint($large) {
          background: transparent;
          color: white;
          left: 35%;
          top: 5px;
          bottom: auto;
        }
      }
      img.gravatar {
        width: 60px;
        height: 60px;
        border-radius: 32px; //half the avatar.png size + borders
        border: 4px solid var(--base);
        position: fixed;
        top: -2px;
        left: -2px;
        z-index: 2;
        transition: transform 0.3s ease-in-out;
        &:hover {
          transform: rotate(360deg);
        }
      }
      .hide-alt {
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
      }
    `,
  ],
  standalone: true,
  imports: [MenuItemComponent, RouterLink],
})
export class MenuComponent {}
