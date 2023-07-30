import { Component, OnInit, Input } from '@angular/core';
import { NgIf } from '@angular/common';

/**
 * Page is a wrapper component, provide the gradient and white background
 */
@Component({
  selector: 'bl-page',
  template: `
    <main class="page-container {{ backgroundClass }}">
      <h2 *ngIf="title">{{ title }}</h2>
      <section class="page">
        <ng-content></ng-content>
      </section>
    </main>
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

      .blue {
        @include diagonal-gradient(#d0d3ed, #addeff, #f4c8dc);
      }
      .yellow {
        @include diagonal-gradient(#f8ead8, #ffffc4, #f2d7ec);
      }
      .orange {
        @include diagonal-gradient(#ffe8a4, #ffd093, #ffffb5);
      }
      .pink {
        @include diagonal-gradient(#d8d2db, #b4eddb, #ffb5dc);
      }
      .green {
        @include diagonal-gradient(#cccec2, #e4efaa, #b4eddb);
      }
      .purple {
        @include diagonal-gradient(#d8c1c6, #c0b8d1, #f5ccba);
      }

      .blue-green {
        @include diagonal-gradient(#b8ddc4, #d9f7a3, #99c4e5);
      }
    `,
  ],
  standalone: true,
  imports: [NgIf],
})
export class PageComponent implements OnInit {
  /**
   * Set page title.
   */
  @Input()
  public title!: string;

  /**
   * name of random class (linked to classes in page.component.scss)
   */
  public backgroundClass!: string;

  ngOnInit() {
    const values = [
      'blue',
      'yellow',
      'orange',
      'pink',
      'green',
      'purple',
      'blue-green',
    ];
    const randomIndex = Math.floor(Math.random() * values.length);
    this.backgroundClass = values[randomIndex];
  }
}
