import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // If the user is not logged in we'll send them back to the home page
    return this.auth.authStatus$
      .filter(s => s !== AuthService.AUTH_STATUS.UNINITIALIZED)
      .map(status => {
        switch (status) {
          case AuthService.AUTH_STATUS.LOGGED_OUT:
            this.router.navigate(['/']);
            return false;
          case AuthService.AUTH_STATUS.NOT_REGISTERED:
            this.router.navigate(['sorry']);
            return false;
          case AuthService.AUTH_STATUS.EMAIL_NOT_VERIFIED:
            console.log('email not verified');
            this.router.navigate(['email-verification']);
            return false;
          case AuthService.AUTH_STATUS.LOGGED_IN:
            return true;
          default:
            return false;
        }
      });
  }

}
