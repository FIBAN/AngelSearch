import { Component } from '@angular/core';

@Component({
  template: `
  <h3>Sorry...</h3>
  <p>An error has happened. This is very disappointing.</p>
  <p>Click <a href="/">here</a> to go back to the front page.</p>
  `
})
export class ErrorComponent {

  constructor() {}
}
