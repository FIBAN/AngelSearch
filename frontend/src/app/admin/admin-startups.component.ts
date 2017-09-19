import { Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {Startup} from "../startups/startup";
import {StartupService} from "../startups/startup.service";

@Component({
  selector: 'admin-startups',
  template: `
    <h3 class="text-center">Admin tools</h3>

    <h4>Startups</h4>
    <div class="row">
      <div class="col">
        <table class="table table-sm">
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>Created At</th>
            <th></th>
          </thead>
          <tbody>
            <tr *ngFor="let startup of startups">
              <!-- Id -->
              <td><span class="monospace small">{{startup.id}}</span></td>
    
              <!-- Name -->
              <td>{{startup.company_name}}</td>
              
              <!-- Created At-->
              <td>{{startup.created_at | date:'medium'}}</td>
              
              <!-- Actions -->
              <td><a class="btn btn-info" [routerLink]="['/admin/startups', startup.id]">Show</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AdminStartupsComponent implements OnInit {
  startups: Startup[];

  constructor(
    private startupService: StartupService
  ) {
  }

  ngOnInit(): void {
    this.startupService.getStartups().then((startups) => this.startups = startups);
  }

}
