import { Component, OnInit, Input } from '@angular/core';

/**
 * Page is a wrapper component, provide the gradient and white background
 */
@Component({
  selector: 'bl-page',
  template: `
    <main class="page-container {{ backgroundClass }}">
      @if (title) {
        <h2>{{ title }}</h2>
      }
      <section class="page">
        <ng-content></ng-content>
      </section>
    </main>
  `,
  styles: [
    `
      .page-container {
        @apply flex pt-[50px] min-h-[calc(100vh)] bg-surface0 text-text content-center justify-center;
      }
      .page-title {
        @apply m-auto py-[25px];
      }
      .page {
        @apply
          w-full
          h-full
          bg-base
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

      .blue {
        @apply bg-gradient-to-br via-[#d0d3ed] to-[#addeff] from-[#f4c8dc];
      }
      .yellow {
        @apply bg-gradient-to-br via-[#f8ead8] to-[#ffffc4] from-[#f2d7ec];
      }
      .orange {
        @apply bg-gradient-to-br via-[#ffe8a4] to-[#ffd093] from-[#ffffb5];
      }
      .pink {
        @apply bg-gradient-to-br via-[#d8d2db] to-[#b4eddb] from-[#ffb5dc];
      }
      .green {
        @apply bg-gradient-to-br via-[#cccec2] to-[#e4efaa] from-[#b4eddb];
      }
      .purple {
        @apply bg-gradient-to-br via-[#d8c1c6] to-[#c0b8d1] from-[#f5ccba];
      }
      .blue-green {
        @apply bg-gradient-to-br via-[#b8ddc4] to-[#d9f7a3] from-[#99c4e5];
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
