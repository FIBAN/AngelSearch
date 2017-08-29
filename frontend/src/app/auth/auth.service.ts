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

  // Create a stream of logged in status to communicate throughout app
  loggedIn$ = new BehaviorSubject<boolean>(undefined);

  angelId$ = new BehaviorSubject<string>(localStorage.getItem('angel_id'));

  registered$ = new BehaviorSubject<boolean>(undefined);

  constructor(private router: Router, private angelService: AngelService) {

    Observable.combineLatest(this.angelId$, Observable.timer(0, 5 * 1000))
      .switchMap(values => {
        const authenticated = this.authenticated;
        const angelId = values[0];
        if (!authenticated) return Observable.of(false);
        if (angelId) return Observable.of(true);
        return Observable.fromPromise(
          this.angelService.getMyAngel().then(angel => {
            localStorage.setItem('angel_id', angel.id);
            this.angelId$.next(angel.id);
            return true;
          }).catch((err) => {
            return false
          })
        );
      }).distinctUntilChanged().subscribe(this.registered$);

    // If authenticated, set local profile property and update login status subject
    if (this.authenticated) {
      this.setLoggedIn(true);
    }
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
          .then(() => this._getAngelProfile())
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

  private _getAngelProfile() {
    // Use access token to retrieve user's profile and set session
    return this.angelService.getMyAngel().then(angel => {
      localStorage.setItem('angel_id', angel.id);
      this.angelId$.next(angel.id);
    }).catch(() => localStorage.removeItem('angel_id'))
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
    localStorage.removeItem('angel_id');
    this.router.navigate(['/']);
    this.angelId$.next(null);
    this.setLoggedIn(false);
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return tokenNotExpired('token');
  }

}
