import { Component} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'email-verification',
  template: `
    <h3>Your email is not verified</h3>
    <p>You should have received a verification request to your email. It might possibly be in your spam folder. A verified email address is required to use this service.</p>
  `
})
export class EmailVerificationMissingComponent {

  constructor(private authService: AuthService,
              private router: Router) {
    authService.authStatus$.subscribe(s => {
      if(s === AuthService.AUTH_STATUS.LOGGED_IN)
        this.router.navigate(['/'])
    })
  }
}
