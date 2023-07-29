import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { PageComponent } from '../../../../shared/components/page/page.component';

@Component({
  selector: 'bl-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageComponent, CardComponent],
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('admin');
  }
}
