import {Component, OnInit} from '@angular/core';
import {Startup} from '../../startups/startup';
import {Angel} from '../../angels/angel';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StartupService} from '../../startups/startup.service';
import {AngelService} from '../../angels/angel.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: 'add-startup.component.html',
  styles: [
    '.ng-valid[required], .ng-valid.required { border-left: 5px solid #42A948; /* green */}',
    '.ng-invalid:not(form) { border-left: 5px solid #a94442; /* red */}'
  ]
})
export class AddStartupComponent implements OnInit {
  angels: Angel[];

  startupForm: FormGroup;

  constructor(
    private startupService: StartupService,
    private angelService: AngelService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.angelService.getAngels().then((angels) => this.angels = angels);

    this.startupForm = this.fb.group({
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

  submit(): void {
    const startup = this.startupForm.getRawValue() as Startup;
    this.startupService.createStartup(startup)
      .then(() => this.router.navigate(['..'], {relativeTo: this.route}));
  }

}
