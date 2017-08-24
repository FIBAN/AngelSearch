import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import {environment} from "../../environments/environment";

@Injectable()
export class AdminService {
  // Define the routes we are going to interact with
  private usersUrl = environment.backend + '/admin/users';

  constructor(private authHttp: AuthHttp) { }

  getUsers() {
    return this.authHttp
      .get(this.usersUrl)
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
