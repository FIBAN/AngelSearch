import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth0-variables';
import { tokenNotExpired } from 'angular2-jwt';
import { AngelService } from '../angels/angel.service';
import { Observable } from 'rxjs/Rx';
import * as auth0 from 'auth0-js';


@Injectable()
export class AuthService {

  static readonly AUTH_STATUS = {
    LOGGED_OUT: 'logged_out',
    NOT_REGISTERED: 'not_registered',
    EMAIL_NOT_VERIFIED: 'email_not_verified',
    LOGGED_IN: 'logged_in',
    LOGGED_IN_ADMIN: 'logged_in_admin'
  };

  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN
  });


  authStatus$ = new BehaviorSubject<string>(AuthService.AUTH_STATUS.LOGGED_OUT);

  readonly initialized: Promise<boolean>;

  constructor(private router: Router, private angelService: AngelService) {

    // if the access token is expired log user out
    Observable.timer(0, 5 * 1000)
      .filter(() => !!localStorage.getItem('token'))
      .map(() => tokenNotExpired('token'))
      .filter(v => v === false)
      .subscribe(() => this.logout());

    // load auth status
    this.initialized = this._loadAuthStatus().then(s => this.authStatus$.next(s)).then(() => true);
  }

  private _loadAuthStatus(): Promise<string> {
    if (!this.authenticated) {
      return Promise.resolve(AuthService.AUTH_STATUS.LOGGED_OUT);
    }
    else if (this.isAdmin()) {
      return Promise.resolve(AuthService.AUTH_STATUS.LOGGED_IN_ADMIN);
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
        if (err.status === 403 && JSON.parse(err._body).email_verified === false) {
          return AuthService.AUTH_STATUS.EMAIL_NOT_VERIFIED;
        }
        if (err.status === 403) {
          return AuthService.AUTH_STATUS.NOT_REGISTERED;
        }
        console.error('angel error', err);
        return AuthService.AUTH_STATUS.LOGGED_OUT
      });
    }
  }

  isAdmin(): boolean {
    const profile = localStorage.getItem('profile')  && JSON.parse(localStorage.getItem('profile'));
    return profile && profile['https://angel-search/role'] === 'admin';
  }

  refreshAuthStatus(): Promise<void> {
    return this._loadAuthStatus().then(s => this.authStatus$.next(s));
  }

  login(redirectAfterLogin?: string, signup?: boolean) {
    // Auth0 authorize request
    // Note: nonce is automatically generated: https://auth0.com/docs/libraries/auth0js/v8#using-nonce
    if (redirectAfterLogin) {
      localStorage.setItem('redirectAfterLogin', redirectAfterLogin);
    }
    else {
      localStorage.removeItem('redirectAfterLogin');
    }
    this.auth0.authorize({
      responseType: 'token id_token',
      redirectUri: AUTH_CONFIG.REDIRECT,
      audience: AUTH_CONFIG.AUDIENCE,
      scope: AUTH_CONFIG.SCOPE,
      initialScreen: signup ? 'signUp' : 'login'
    });
  }

  handleAuth(): Promise<string> {
    return new Promise((resolve, reject) => {
      const context = { hash: window.location.hash };
      this.auth0.parseHash((parseError, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this._getAuth0Profile(authResult)
            .then(() => this.refreshAuthStatus())
            .then(() => {
              const savedRedirect = localStorage.getItem('redirectAfterLogin');
              resolve(savedRedirect ? savedRedirect : '/angels');
            })
            .catch(err => reject({context: {...context, result: authResult}, error: err}));
        } else if (parseError) {
          reject({context: {...context, result: authResult}, error: parseError});
        } else {
          reject({context: {...context, result: authResult}, error: 'Unknown error'})
        }
      });
    });

  }

  private _getAuth0Profile(authResult) {
    // Use access token to retrieve user's profile and set session
    return new Promise((resolve, reject) =>
      this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
        if (err) {
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
    // Save session data
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  logout() {
    // Remove tokens and profile
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.authStatus$.next(AuthService.AUTH_STATUS.LOGGED_OUT);
    this.auth0.logout({
      returnTo: AUTH_CONFIG.LOGOUT,
      clientID: AUTH_CONFIG.CLIENT_ID
    });
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return tokenNotExpired('token');
  }

}
