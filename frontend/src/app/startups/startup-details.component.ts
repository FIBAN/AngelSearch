import { Component, OnInit} from '@angular/core';

import { AngelService } from '../angels/angel.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {Startup} from "./startup";
import {StartupService} from "./startup.service";
import {Angel} from "../angels/angel";

@Component({
  selector: 'startup-details',
  templateUrl: 'startup-details.component.html',
  styleUrls: ['startup-details.component.css']
})
export class StartupDetailsComponent implements OnInit {
  startup: Startup;
  leadAngel: Angel;

  constructor(
    private startupService: StartupService,
    private angelService: AngelService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.startupService.getStartup(params.get('startupId')))
      .switchMap((startup) =>
        this.angelService.getAngel(startup.lead_angel_id)
          .then((angel) => ({angel: angel, startup: startup}))
      )
      .subscribe((startupWithLeadAngel) => {
        this.startup = startupWithLeadAngel.startup;
        this.leadAngel = startupWithLeadAngel.angel;
      });
  }

}
