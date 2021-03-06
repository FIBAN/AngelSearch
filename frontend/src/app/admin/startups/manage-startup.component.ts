import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router, Routes} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngelService} from '../../angels/angel.service';
import {StartupService} from '../../startups/startup.service';
import {Startup} from '../../startups/startup';
import {Angel} from '../../angels/angel';

@Component({
  templateUrl: 'manage-startup.component.html',
  styles: [
  ]
})
export class ManageStartupComponent implements OnInit {

  startup: Startup;

  startupForm: FormGroup;

  angels: Angel[];

  constructor(
    private angelService: AngelService,
    private startupService: StartupService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.startupService.getStartup(params.get('startupId')))
      .subscribe((startup: Startup) => {
        console.log('startup', startup);
        this.startup = startup;

        this.startupForm = this.fb.group({
          'lead_angel_id': startup.lead_angel_id,
          'company_name': startup.company_name,
          'oneliner': startup.oneliner,
          'industry': startup.industry,
          'website': startup.website,
          'city': startup.city,
          'country': startup.country,
          'entrepreneur_name': startup.entrepreneur_name,
          'entrepreneur_email': startup.entrepreneur_email,
          'entrepreneur_phone': startup.entrepreneur_phone,
          'round_size_and_open_tickets': startup.round_size_and_open_tickets,
          'valuation': startup.valuation,
          'committed_percentage': startup.committed_percentage,
          'pitch_deck_link': startup.pitch_deck_link,
          'status': startup.status,
          'current_revenue_or_committed_customers': startup.current_revenue_or_committed_customers,
          'commitment_deadline': this.dateToDatepickerModel(startup.commitment_deadline)
        })
      });

    this.angelService.getAngels().then((angels) => this.angels = angels);
  }

  private dateToDatepickerModel(date: Date): any {
    if (date) {
      return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate()
      };
    }
    else {
      return null;
    }
  }

  private datepickerModelToDate(model): Date {
    if (model) {
      const d = new Date();
      d.setUTCFullYear(model.year, model.month - 1, model.day);
      d.setUTCHours(0, 0, 0, 0);
      return d;
    }
    else {
      return model;
    }
  }

  saveChanges(): void {
    const formData = this.startupForm.getRawValue();
    for (const k in formData) {
      if (formData.hasOwnProperty(k)) {
        this.startup[k] = formData[k];
      }
    }
    this.startup.commitment_deadline = this.datepickerModelToDate(formData.commitment_deadline);

    this.startupService.updateStartup(this.startup)
      .then(() => {
        location.reload();
      });
  }

  deleteStartup(): void {
      this.startupService.deleteStartup(this.startup.id)
        .then(() =>
          this.router.navigate(['/admin/startups'])
        );
  }

}
