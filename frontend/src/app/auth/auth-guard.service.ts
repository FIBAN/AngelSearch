import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // If the user is not logged in we'll send them back to the home page
    if (!this.auth.authenticated) {
      this.router.navigate(['']);
      return Observable.of(false);
    } else {
      return this.auth.registered$.find(r => r).timeout(5 * 1000)
        .catch(err => {
          this.router.navigate(['sorry']);
          return Observable.of(false);
        });
    }
  }

}
