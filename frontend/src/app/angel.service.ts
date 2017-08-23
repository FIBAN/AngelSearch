import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment} from "../environments/environment"

import 'rxjs/add/operator/toPromise';

import { Angel } from './angel';

@Injectable()
export class AngelService {
  // Define the routes we are going to interact with
  private angelsUrl = environment.backend + '/angels';
  private angelDetailsUrl(angelId: string) { return this.angelsUrl + '/' + angelId; }
  private meUrl = environment.backend + '/me';
  private angelInviteUrl(angelId: string) { return this.angelDetailsUrl(angelId) + '/invitations'}
  private invitationsUrl = environment.backend + '/invitations';
  private invitationDetailsUrl(inviteId: string) { return this.invitationsUrl + '/' + inviteId; }
  private invitationAcceptUrl(inviteId: string) { return this.invitationsUrl + '/' + inviteId + '/accept'; }

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getAngels() {
    return this.authHttp
      .get(this.angelsUrl)
      .toPromise()
      .then(response=>response.json() as Angel[])
      .catch(this.handleError);
  }


  getAngel(angelId: string) {
    return this.authHttp
      .get(this.angelDetailsUrl(angelId))
      .toPromise()
      .then(response=>response.json() as Angel)
      .catch(this.handleError);
  }

  getMyAngel() {
    return this.authHttp
      .get(this.meUrl)
      .toPromise()
      .then(response=>response.json() as Angel)
      .catch(this.handleError);
  }

  updateAngel(angel: Angel) {
    return this.authHttp
      .put(this.angelDetailsUrl(angel.id), angel)
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError);
  }

  getInvitation(inviteId: string) {
    return this.http
      .get(this.invitationDetailsUrl(inviteId))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getInvitations() {
    return this.authHttp
      .get(this.invitationsUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  acceptInvitation(inviteId: string) {
    return this.authHttp
      .post(this.invitationAcceptUrl(inviteId), null)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createInvite(angelId: string) {
    return this.authHttp
      .post(this.angelInviteUrl(angelId), null)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createAngel(angel: Angel) {
    return this.authHttp
      .post(this.angelsUrl, angel)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
