import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";

@Component({
  template: `
    <div *ngIf="error" class="alert alert-danger" role="alert">
      <p>An error happened when trying to log in. <a href="#" (click)="showDetails = !showDetails; false">More details</a></p>
      <pre *ngIf="showDetails" class="bg-dark text-light"><code>{{error | json}}</code></pre>
      <a routerLink="/">Go Back</a>
    </div>`
})
export class CallbackComponent {

  error: string;
  showDetails: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.handleAuth()
      .then(redirectUrl => router.navigateByUrl(redirectUrl))
      .catch(err => this.error = err);
  }
}
