import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from "rxjs/Rx";

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return Observable.fromPromise(this.auth.initialized)
      .map(() => {
        switch (this.auth.authStatus$.getValue()) {
          case AuthService.AUTH_STATUS.LOGGED_IN_ADMIN:
            return true;
          default:
            this.router.navigate(['']);
            return false;
        }
      });
  }

}
