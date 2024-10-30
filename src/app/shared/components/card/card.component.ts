import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bl-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      @import '_variables';

      .card {
        background-color: $white;
        margin: 15px;
        box-shadow: 0 0 15px black;
      }
    `,
  ],
  standalone: true,
})
export class CardComponent {}
