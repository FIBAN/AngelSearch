import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment} from '../../environments/environment'

import 'rxjs/add/operator/toPromise';

import { Startup } from './startup';
import * as Raven from 'raven-js';

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
      .then(response => response.json().map(this.convertCommitmentDeadlineIntoDate) as Startup[])
      .catch(this.handleError);
  }

  getStartup(startupId: string) {
    return this.authHttp
      .get(this.startupDetailsUrl(startupId))
      .toPromise()
      .then(response => this.convertCommitmentDeadlineIntoDate(response.json()) as Startup)
      .catch(this.handleError);
  }

  updateStartup(startup: Startup) {
    return this.authHttp
      .put(this.startupDetailsUrl(startup.id), startup)
      .toPromise()
      .then(response => this.convertCommitmentDeadlineIntoDate(response.json()) as Startup)
      .catch(this.handleError);
  }

  createStartup(startup: Startup) {
    return this.authHttp
      .post(this.startupsUrl, startup)
      .toPromise()
      .then(response => this.convertCommitmentDeadlineIntoDate(response.json()) as Startup)
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
    Raven.captureException(error);
    return Promise.reject(error.message || error);
  }

  private convertCommitmentDeadlineIntoDate(startup: any): any {
    if (startup.commitment_deadline) {
      try {
        startup.commitment_deadline = new Date(startup.commitment_deadline);
      } catch (err) {}
    }
    return startup;
  }
}
