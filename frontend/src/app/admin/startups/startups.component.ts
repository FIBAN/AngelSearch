import { Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {Startup} from "../../startups/startup";
import {StartupService} from "../../startups/startup.service";

@Component({
  template: `
    <div class="row">
      <div class="col">
        <h4>Startups</h4>
      </div>
      <div class="col text-right">
        <a routerLink="add" class="btn btn-primary mb-2">Add Startup</a>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <admin-startup-list [startups]="startups"></admin-startup-list>
      </div>
    </div>
  `
})
export class StartupsComponent implements OnInit {
  startups: Startup[];

  constructor(
    private startupService: StartupService,
  ) {
  }

  ngOnInit(): void {
    this.startupService.getStartups().then((startups) => this.startups = startups);
  }

}
