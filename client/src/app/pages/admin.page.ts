import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PageComponent } from '../shared/components/page/page.component';
import { CardComponent } from '../shared/components/card/card.component';

@Component({
  selector: 'bl-admin',
  template: `<bl-page>
    <h2>Administration</h2>
    <bl-card>
      <!-- <ckeditor [editor]="text"></ckeditor> -->
    </bl-card>
  </bl-page> `,
  styles: [
    `
      .admin-card {
        background: white;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageComponent, CardComponent],
})
export class AdminPageComponent {}

export default AdminPageComponent;
