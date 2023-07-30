import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bl-article',
  template: `<div class="article-content">
      <!-- This is where Analog will inject the static HTML -->
      <!-- TODO: use markdown component-->
    </div>

    <ul class="article-share-box"></ul>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ArticlePageComponent {}

export default ArticlePageComponent;
