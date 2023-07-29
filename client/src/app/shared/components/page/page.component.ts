import { Component, OnInit, Input } from '@angular/core';
import { NgIf } from '@angular/common';

/**
 * Page is a wrapper component, providethe gradient and white background
 */
@Component({
  selector: 'bl-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class PageComponent implements OnInit {
  /**
   * Set page title.
   */
  @Input()
  public title!: string;

  /**
   * name of random class (linked to classes in page.component.scss)
   */
  public backgroundClass!: string;

  constructor() {}

  ngOnInit() {
    const values = [
      'blue',
      'yellow',
      'orange',
      'pink',
      'green',
      'purple',
      'blue-green',
    ];
    const randomIndex = Math.floor(Math.random() * values.length);
    this.backgroundClass = values[randomIndex];
  }
}
