import { Component} from '@angular/core';
import { AuthService } from './auth.service';

import { AngelService } from './angel.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'angel-profile',
  template: `
    <h3>We are sorry</h3>
    <p>To access the content of this website you need an invitation.</p>
  `
})
export class RegistrationNeededComponent {

  constructor(
    private authService: AuthService) {
  }
}
