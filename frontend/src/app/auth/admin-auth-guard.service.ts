import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.authStatus$
      .filter(s => s !== AuthService.AUTH_STATUS.UNINITIALIZED)
      .map(status => {
        switch (status) {
          case AuthService.AUTH_STATUS.LOGGED_IN:
            return true;
          default:
            this.router.navigate(['/']);
            return false;
        }
      });
  }

}
