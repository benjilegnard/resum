import { Component, OnInit } from '@angular/core';
import { trigger, animate, transition, style } from '@angular/animations';
import * as faker from 'faker';

@Component({
  selector: 'bl-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [
    trigger('pageInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('.3s', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('.3s', style({ opacity: 0, transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class PageComponent implements OnInit {

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
      'blue-green'
    ]);
  }
}
