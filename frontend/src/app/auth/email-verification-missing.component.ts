import {Component, OnDestroy, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  template: `
    <h3>Your email is not verified</h3>
    <p>You should have received a verification request to your email.
      It might possibly be in your spam folder.
      A verified email address is required to use this service.</p>
  `
})
export class EmailVerificationMissingComponent implements OnInit, OnDestroy {

  checkEmailSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit (): void {
    const userLoggedIn$ = this.authService.authStatus$.filter(s => s === AuthService.AUTH_STATUS.LOGGED_IN);
    this.checkEmailSub = Observable.timer(0, 5 * 1000)
      .do(() => this.authService.refreshAuthStatus())
      .takeUntil(userLoggedIn$)
      .subscribe(
        (next) => next,
        (error) => error,
        () => this.router.navigate(['/'])
      );
  }

  ngOnDestroy (): void {
    this.checkEmailSub.unsubscribe();
  }
}
