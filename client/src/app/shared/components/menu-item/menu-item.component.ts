import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bl-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
})
export class MenuItemComponent implements OnInit {
  @Input()
  routerLink: string[] = [];
  constructor() {}

  ngOnInit() {}
}
