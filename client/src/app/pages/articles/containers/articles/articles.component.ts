import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bl-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
  public article$: Observable<ScullyRoute[]>;

  constructor(private scully: ScullyRoutesService) {
    this.article$ = this.scully.available$.pipe(
      map(routes => routes.filter((route) => route.published))
    );
  }
}
