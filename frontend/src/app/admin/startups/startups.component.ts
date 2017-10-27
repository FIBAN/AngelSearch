import { Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {Startup} from "../../startups/startup";
import {StartupService} from "../../startups/startup.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Angel} from "../../angels/angel";
import {AngelService} from "../../angels/angel.service";

@Component({
  templateUrl: 'startups.component.html',
  styles: [
    '.ng-valid[required], .ng-valid.required { border-left: 5px solid #42A948; /* green */}',
    '.ng-invalid:not(form) { border-left: 5px solid #a94442; /* red */}'
  ]
})
export class AdminStartupsComponent implements OnInit {
  startups: Startup[];
  angels: Angel[];

  newStartupForm: FormGroup;

  constructor(
    private startupService: StartupService,
    private angelService: AngelService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.startupService.getStartups().then((startups) => this.startups = startups);
    this.angelService.getAngels().then((angels) => this.angels = angels);

    this.newStartupForm = this.fb.group({
      'lead_angel_id': '',
      'company_name': '',
      'oneliner': '',
      'industry': '',
      'website': '',
      'city': '',
      'country': '',
      'entrepreneur_name': '',
      'entrepreneur_email': '',
      'entrepreneur_phone': '',
      'round_size_and_open_tickets': '',
      'valuation': '',
      'committed_percentage': '',
      'pitch_deck_link': ''
    })
  }

  saveNewStartup(): void {
    const formData = this.newStartupForm.getRawValue();
    this.startupService.createStartup(formData).then(() => this.ngOnInit());
  }

}
