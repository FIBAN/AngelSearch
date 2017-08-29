import { Component} from '@angular/core';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'registration-needed',
  template: `
    <h3>We are sorry</h3>
    <p>To access the content of this website you need an invitation.</p>
  `
})
export class RegistrationNeededComponent {

  constructor() {
  }
}
