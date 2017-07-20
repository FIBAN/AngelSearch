import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Angel } from './angel';

@Injectable()
export class AngelService {
  // Define the routes we are going to interact with
  private angelsUrl = 'http://localhost:3001/api/angels';

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
      .get(this.angelsUrl + '/' + angelId)
      .toPromise()
      .then(response=>response.json() as Angel)
      .catch(this.handleError);
  }

  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
