import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment} from '../../environments/environment'

import 'rxjs/add/operator/toPromise';

import { Startup } from './startup';

@Injectable()
export class StartupService {
  // Define the routes we are going to interact with
  private startupsUrl = environment.backend + '/startups';
  private startupDetailsUrl(startupId: string) { return this.startupsUrl + '/' + startupId; }

  constructor(private authHttp: AuthHttp) { }

  getStartups() {
    return this.authHttp
      .get(this.startupsUrl)
      .toPromise()
      .then(response => response.json() as Startup[])
      .catch(this.handleError);
  }

  getStartup(startupId: string) {
    return this.authHttp
      .get(this.startupDetailsUrl(startupId))
      .toPromise()
      .then(response => response.json() as Startup)
      .catch(this.handleError);
  }

  updateStartup(startup: Startup) {
    return this.authHttp
      .put(this.startupDetailsUrl(startup.id), startup)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createStartup(startup: Startup) {
    return this.authHttp
      .post(this.startupsUrl, startup)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  deleteStartup(startupId: string) {
    return this.authHttp
      .delete(this.startupDetailsUrl(startupId))
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
