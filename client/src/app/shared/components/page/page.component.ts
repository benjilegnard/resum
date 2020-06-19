import { Component, OnInit, Input } from '@angular/core';
import { trigger, animate, transition, style } from '@angular/animations';
import * as faker from 'faker';

/**
 * Page is a wrapper component, providethe gradient and white background
 */
@Component({
  selector: 'bl-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [
    trigger('pageInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('.15s', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('.15s', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class PageComponent implements OnInit {
  /**
   * Set page title.
   */
  @Input()
  public title: string;

  /**
   * name of random class (linked to classes in page.component.scss)
   */
  public backgroundClass: string;

  constructor() {}

  ngOnInit() {
    this.backgroundClass = faker.helpers.randomize([
      'blue',
      'yellow',
      'orange',
      'pink',
      'green',
      'purple',
      'blue-green',
    ]);
  }
}
