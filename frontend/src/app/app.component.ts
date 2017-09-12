import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'angel-search',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.css']
})
export class AppComponent {
  authenticated: boolean;
  authorized: boolean;
  isAdmin: boolean;

  isNavbarCollapsed = true;

  // We'll need to include a reference to our authService in the constructor to gain access to the API's in the view
  constructor(public authService: AuthService, public router: Router) {
    authService.authStatus$.subscribe(s => {
      this.authenticated = s !== AuthService.AUTH_STATUS.LOGGED_OUT;
      this.authorized = s === AuthService.AUTH_STATUS.LOGGED_IN || s === AuthService.AUTH_STATUS.LOGGED_IN_ADMIN;
      this.isAdmin = s === AuthService.AUTH_STATUS.LOGGED_IN_ADMIN;
    });
  }
}
