import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';

import 'prismjs';
import 'prismjs/themes/prism.css';

import { ArticleAttributes } from '@benjilegnard/resum/shared/model';

@Component({
  selector: 'bl-article',
  template: `<div class="article-content">
      <ng-container *ngIf="article$ | async as article">
        <h1>{{ article.attributes.title }}</h1>
        <analog-markdown [content]="article.content"></analog-markdown>
      </ng-container>
    </div>
    <ul class="article-share-box">
      <li></li>
    </ul>`,
  styles: [``],
  imports: [MarkdownComponent, NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ArticlePageComponent {

  @Input()
  public slug!: string;

  readonly article$ = injectContent<ArticleAttributes>({
    param: 'articleSlug',
    subdirectory: 'articles',
  });
}

export default ArticlePageComponent;
