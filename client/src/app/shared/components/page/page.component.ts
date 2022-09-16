import { Component, OnInit, Input } from '@angular/core';
import { trigger, animate, transition, style } from '@angular/animations';
import { NgIf } from '@angular/common';

/**
 * Page is a wrapper component, provide the gradient and white background
 */
@Component({
  selector: 'bl-page',
  template: `
    <article class="page-container">
      <h2 *ngIf="title">{{ title }}</h2>
      <section class="page">
        <ng-content></ng-content>
      </section>
    </article>
  `,
  styles: [
    `
      @import '_mixins';
      @import '_variables';

      @import 'breakpoint-sass';

      .page-container {
        display: flex;
        padding-top: 50px;
        min-height: calc(100vh - 50px);
        font-size: 1.2rem;
        color: black;
      }
      .page-title {
        padding: 25px 0;
        margin: 0 auto;
      }
      .page {
        width: 80%;
        height: 100%;
        background-color: white;
        margin: 25px auto;
        padding: 25px;
        flex: 0 0 auto;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
        @include breakpoint($medium) {
          margin: 25px auto;
          max-width: 768px;
        }
        @include breakpoint($large) {
          max-width: 1024px;
        }
      }
    `,
  ],
  standalone: true,
  imports: [NgIf],
})
export class PageComponent {
  /**
   * Set page title.
   */
  @Input()
  public title!: string;

}
