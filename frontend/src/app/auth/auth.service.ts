import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth0-variables';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import * as auth0 from 'auth0-js';
import * as jwt_decode from 'jwt-decode';
import {Angel} from '../angels/angel';
import {environment} from '../../environments/environment';
import * as Raven from 'raven-js';


@Injectable()
export class AuthService {

  static readonly AUTH_STATUS = {
    UNINITIALIZED: 'uninitialized',
    LOGGED_OUT: 'logged_out',
    NOT_REGISTERED: 'not_registered',
    EMAIL_NOT_VERIFIED: 'email_not_verified',
    LOGGED_IN: 'logged_in'
  };

  private resendVerifyEmailUrl = environment.backend + '/me/resend-email';

  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN
  });

  authStatus$ = new BehaviorSubject<string>(AuthService.AUTH_STATUS.UNINITIALIZED);

  constructor(private authHttp: AuthHttp) {

    // if the access token is expired log user out
    Observable.timer(1000, 5 * 1000)
      .filter(() => !!localStorage.getItem('token'))
      .map(() => tokenNotExpired('token'))
      .filter(v => v === false)
      .subscribe(() => this.logout());

    this.refreshAuthStatus();
  }

  get decodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem('token'));
    } catch (err) {
      return undefined;
    }
  }

  accessTokenHasScope(scope: string): boolean {
    const token = this.decodedAccessToken;
    if (token) {
      const scopes = this.decodedAccessToken.scope.split(' ').map(s => s.trim().toLowerCase());
      return scopes.indexOf(scope.toLowerCase()) > -1;
    }
    else {
      return false;
    }
  }

  private _deduceAuthStatus(): Promise<string> {
    if (!tokenNotExpired('token')) {
      return Promise.resolve(AuthService.AUTH_STATUS.LOGGED_OUT);
    }
    else if (! this.accessTokenHasScope('read:angels')) {
      if (! this._userHasVerifiedTheirEmail()) {
        return Promise.resolve(AuthService.AUTH_STATUS.EMAIL_NOT_VERIFIED);
      }
      else {
        return Promise.resolve(AuthService.AUTH_STATUS.NOT_REGISTERED);
      }
    }
    else {
      return Promise.resolve(AuthService.AUTH_STATUS.LOGGED_IN);
    }
  }

  private _userHasVerifiedTheirEmail(): boolean {
    const profile = JSON.parse(localStorage.getItem('profile'));
    return profile.email_verified;
  }

  refreshAuthStatus(): Promise<void> {
    return this._deduceAuthStatus().then(s => this.authStatus$.next(s));
  }

  login(options?: {
    invitationId?: string,
    developmentLogInAngelIdOverride?: string,
    developmentRegisterationAngelIdOverride?: string,
    skipPrompt?: boolean
  }) {
    options = options || {};

    this.auth0.authorize({
      responseType: 'token id_token',
      redirectUri: AUTH_CONFIG.REDIRECT,
      audience: AUTH_CONFIG.AUDIENCE,
      scope: AUTH_CONFIG.SCOPE,
      initialScreen: options.invitationId ? 'signUp' : 'login',
      invitationId: options.invitationId || undefined,
      testInvitationResponse: options.developmentRegisterationAngelIdOverride || undefined,
      testAngelIdResponse: options.developmentLogInAngelIdOverride || undefined,
      prompt: options.skipPrompt ? 'none' : undefined
    });
  }

  handleAuth(): Promise<string> {
    return new Promise((resolve, reject) => {
      const context = { hash: window.location.hash };
      this.auth0.parseHash((parseError, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this._getAuth0Profile(authResult)
            .then(() => this.refreshAuthStatus())
            .then(() => resolve('/angels'))
            .catch(err => reject({context: {...context, result: authResult}, error: err}));
        } else if (parseError) {
          reject({context: {...context, result: authResult}, error: parseError});
        } else {
          reject({context: {...context, result: authResult}, error: 'HandleAuth error'})
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

  resendVerificationEmail() {
    return this.authHttp
      .get(this.resendVerifyEmailUrl)
      .toPromise()
      .then(response => response.json() as Angel[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    Raven.captureException(error);
    return Promise.reject(error.message || error);
  }

}
