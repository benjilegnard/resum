import { AsyncPipe, NgFor } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

interface Route {
  title: string;
  route: string[];
}
@Component({
  selector: 'bl-articles',
  template: `<h2>Articles</h2>
    <ul>
      <li *ngFor="let article of article$ | async">
        <a [routerLink]="article.route">{{ article.title }}</a>
      </li>
    </ul> `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe],
})
export class ArticlesPageComponent {
  public article$!: Observable<Route[]>;
}

export default ArticlesPageComponent;
