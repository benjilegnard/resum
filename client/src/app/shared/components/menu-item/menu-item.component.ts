import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'bl-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent implements OnInit {
  @Input()
  routerLink: string[] = [];
  constructor() {}

  ngOnInit() {}
}
