import { Component } from '@angular/core';

@Component({
  selector: 'bl-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .card {
        @apply bg-base m-4 shadow-lg;
      }
    `,
  ],
  standalone: true,
})
export class CardComponent {}
