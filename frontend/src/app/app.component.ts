import {Component} from '@angular/core';

import { AuthService } from './auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'angel-search',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.scss']
})
export class AppComponent {
  authenticated: boolean;
  authorized: boolean;
  isAdmin: boolean;
  hideLogin = false;

  isNavbarCollapsed = true;

  constructor(
              public authService: AuthService,
              public router: Router
  ) {

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideLogin = event.url.startsWith('/invite');
      }
    });

    authService.authStatus$.subscribe(s => {
      this.authenticated = s !== AuthService.AUTH_STATUS.LOGGED_OUT;
      this.authorized = s === AuthService.AUTH_STATUS.LOGGED_IN || s === AuthService.AUTH_STATUS.LOGGED_IN_ADMIN;
      this.isAdmin = s === AuthService.AUTH_STATUS.LOGGED_IN_ADMIN;
    });

  }
}
