import { Component } from '@angular/core';
// First and foremost we'll include our authentication service
import { AuthService } from './auth.service';

@Component({
  selector: 'daily-deals',
  template: `
    <div class="container">
      <nav class="navbar navbar-default">
        <div class="navbar-header">
          <a class="navbar-brand" routerLink="/"></a>
        </div>
        <ul class="nav navbar-nav">
          <li>
            <a routerLink="/angels" routerLinkActive="active">Angels</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a *ngIf="!authService.authenticated" (click)="authService.login()">Log In</a>
          </li>
          <li>
            <a (click)=authService.logout() *ngIf="authService.authenticated">Log Out</a>
          </li>
        </ul>
      </nav>
      <div class="col-sm-12">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles : ['.navbar-right { margin-right: 0px !important}']
})
export class AppComponent {
  title = 'Angel Search';

  // We'll need to include a reference to our authService in the constructor to gain access to the API's in the view
  constructor(private authService: AuthService) {
  }
}
