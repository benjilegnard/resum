import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

interface Route{
  title: string;
  route: string[];
}
@Component({
  selector: 'bl-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
  public article$!: Observable<Route[]>;
}
