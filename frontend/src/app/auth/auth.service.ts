import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth0-variables';
import { tokenNotExpired } from 'angular2-jwt';
import { AngelService } from "../angels/angel.service";
import { Observable } from "rxjs/Rx";

// Avoid name not found warnings
declare var auth0: any;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN
  });

  static readonly AUTH_STATUS = {
    LOGGED_OUT: "logged_out",
    NOT_REGISTERED: "not_registered",
    EMAIL_NOT_VERIFIED: "email_not_verified",
    LOGGED_IN: "logged_in"
  };

  // Create a stream of logged in status to communicate throughout app
  loggedIn$ = new BehaviorSubject<boolean>(undefined);

  authStatus$ = new BehaviorSubject<string>(AuthService.AUTH_STATUS.LOGGED_OUT);

  constructor(private router: Router, private angelService: AngelService) {

    Observable.timer(0, 30 * 1000)
      .flatMap(() => Observable.fromPromise(this._authStatus()))
      .distinctUntilChanged()
      .subscribe(this.authStatus$);

    // If authenticated, set local profile property and update login status subject
    if (this.authenticated) {
      this.setLoggedIn(true);
    }
  }

  private _authStatus() {
    if(!this.authenticated) {
      return Promise.resolve(AuthService.AUTH_STATUS.LOGGED_OUT);
    }
    else {
      return this.angelService.getMyAngel().then(angel => {
        if (!angel) {
          return AuthService.AUTH_STATUS.NOT_REGISTERED;
        }
        else {
          return AuthService.AUTH_STATUS.LOGGED_IN;
        }
      }).catch((err) => {
        if(err.status === 403 && JSON.parse(err._body).email_verified === false) {
          return AuthService.AUTH_STATUS.EMAIL_NOT_VERIFIED
        }
        console.error("angel error", err);
        return AuthService.AUTH_STATUS.LOGGED_OUT
      });
    }
  }

  getAuthStatus() {
    const status = this._authStatus();
    status.then(s => this.authStatus$.next(s));
    return status;
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
  }

  login(redirectAfterLogin?: string) {
    // Auth0 authorize request
    // Note: nonce is automatically generated: https://auth0.com/docs/libraries/auth0js/v8#using-nonce
    if(redirectAfterLogin) localStorage.setItem("redirectAfterLogin", redirectAfterLogin);
    else localStorage.removeItem("redirectAfterLogin");
    this.auth0.authorize({
      responseType: 'token id_token',
      redirectUri: AUTH_CONFIG.REDIRECT,
      audience: AUTH_CONFIG.AUDIENCE,
      scope: AUTH_CONFIG.SCOPE
    });
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getAuth0Profile(authResult)
          .then(()=> {
            const savedRedirect = localStorage.getItem("redirectAfterLogin");
            this.router.navigateByUrl(savedRedirect ? savedRedirect : '/');
          });
      } else if (err) {
        this.router.navigate(['/']);
        console.error(`Error: ${err.error}`, err);
      }
    });
  }

  private _getAuth0Profile(authResult) {
    // Use access token to retrieve user's profile and set session
    return new Promise((resolve, reject) =>
      this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
        if(err) {
          reject(err);
        }
        else {
          this._setSession(authResult, profile);
          resolve();
        }
      })
    );
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.setLoggedIn(true);
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
    this.setLoggedIn(false);
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return tokenNotExpired('token');
  }

}
