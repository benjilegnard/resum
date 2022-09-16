import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageComponent } from '../shared/components/page/page.component';

@Component({
  selector: 'bl-about',
  template: `
    <bl-page>
      <h2>About</h2>
      <h3>About me</h3>
      <p>A small presentation text</p>
      <h3>This blog</h3>
      <p>This website, was made using :</p>
      <ul>
        <li>
          Icons by
          <a href="https://phosphoricons.com/" target="_blank">Phosphoricons</a>
        </li>
      </ul>
    </bl-page>
  `,
  styles: [],
  imports: [PageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AboutPageComponent {}

export default AboutPageComponent;
