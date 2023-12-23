import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bl-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Error 404: page not found</h2>
    <a routerLink="/">Go Back Home</a>
  `,
  styles: [``],
})
export class NotFoundPageComponent {}

export default NotFoundPageComponent;
