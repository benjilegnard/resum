import { Component, OnInit, Input } from '@angular/core';

/**
 * Page is a wrapper component, provide the gradient and white background
 */
@Component({
  selector: 'bl-page',
  template: `
    <article class="page-container">
      @if (title) {
        <h2>{{ title }}</h2>
      }
      <section class="page">
        <ng-content></ng-content>
      </section>
    </article>
  `,
  styles: [
    `
      .page-container {
        @apply flex pt-[50px] pb-[68px] min-h-[calc(100vh)] text-text content-center justify-center;
      }
      .page-title {
        @apply m-auto py-[25px];
      }
      .page {
        @apply w-full
          h-full
          bg-mantle
          text-text
          m-0
          p-6
          flex-none
          justify-self-center
          shadow-lg
          md:m-6
          md:max-w-3xl
          lg:max-w-5xl;
      }

    `,
  ],
  standalone: true,
  imports: [],
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
