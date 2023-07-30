import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bl-about',
  template: `<h2>About me</h2>
    <p>A small presentation text</p>
    <p>Another small presentation text</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AboutPageComponent {}

export default AboutPageComponent;
