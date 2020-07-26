import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'bl-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent implements OnInit {
  public articles: Observable<Array<any>> = of([]);
  constructor() {}

  ngOnInit() {}
}
