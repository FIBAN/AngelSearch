import {Component, OnDestroy, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {AuthService} from './auth.service';
import * as Raven from 'raven-js';

@Component({
  template: `
    <h3>Your email is not verified</h3>
    <p>
      You can verify your email by clicking a link in the verification email.
      If you can't find the email remember to check also your spam folder. You can also resend the verification email by clicking the button below labeled "Resend Verification Email".
    </p>
    <p>
      After verifying your email click the button below labeled "I Have Verified My Email"
    </p>
    <div *ngIf="showResendConfirmation" class="alert alert-info">Verification email sent!</div>
    <div *ngIf="showResendError" class="alert alert-danger">Failed to send a verification email</div>
    <a role="button" class="btn btn-info text-light" (click)="resendEmail()">Resend Verification Email</a>
    <a role="button" class="btn btn-success text-light" (click)="checkIfEmailVerified()">I Have Verified My Email</a>
  `
})
export class EmailVerificationMissingComponent implements OnInit, OnDestroy {

  showResendConfirmation: boolean;
  showResendError: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit (): void {
  }

  ngOnDestroy (): void {
  }

  resendEmail(): void {
    console.log('resending email');
    this.authService.resendVerificationEmail()
      .then(() => {
        this.showResendConfirmation = true;
        setTimeout(() => this.showResendConfirmation = false, 20000);
      })
      .catch((err) => {
        Raven.captureException(err);
        this.showResendError = true;
        setTimeout(() => this.showResendError = false, 20000);
      });
  }

  checkIfEmailVerified(): void {
    console.log('checking email');
    this.authService.login({skipPrompt: true});
  }

}
