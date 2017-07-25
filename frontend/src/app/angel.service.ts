import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Angel } from './angel';

@Injectable()
export class AngelService {
  // Define the routes we are going to interact with
  private API_URL = 'http://localhost:3001/api';
  private angelsUrl = this.API_URL + '/angels';
  private angelDetailsUrl(angelId: string) { return this.angelsUrl + '/' + angelId; }
  private meUrl = this.API_URL + '/me';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getAngels() {
    return this.http
      .get(this.angelsUrl)
      .toPromise()
      .then(response=>response.json() as Angel[])
      .catch(this.handleError);
  }


  getAngel(angelId: string) {
    return this.http
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
    return this.http
      .put(this.angelDetailsUrl(angel.id), angel)
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError);
  }

  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
