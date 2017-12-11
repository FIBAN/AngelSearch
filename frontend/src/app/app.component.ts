import {Component} from '@angular/core';

import { AuthService } from './auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';

@Component({
  selector: 'angel-search',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.scss']
})
export class AppComponent {
  authenticated: boolean;
  hideLogin = false;

  isNavbarCollapsed = true;

  constructor(
              public authService: AuthService,
              public router: Router,
              angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) {

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideLogin = event.url.startsWith('/invite');
      }
    });

    authService.authStatus$
      .filter(s => s !== AuthService.AUTH_STATUS.UNINITIALIZED)
      .subscribe(s => {
      this.authenticated = s !== AuthService.AUTH_STATUS.LOGGED_OUT;
    });

  }
}
