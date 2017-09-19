import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router, Routes} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngelService} from "../angels/angel.service";
import {StartupService} from "../startups/startup.service";
import {Startup} from "../startups/startup";
import {Angel} from "../angels/angel";

@Component({
  selector: 'admin-manage-startup',
  template: `
    <h3 class="text-center">{{startup?.company_name}}</h3>
    
    <div class="row">
      <div class="col">
        <form *ngIf="startupForm" [formGroup]="startupForm">
          <table class="table">
            <tbody>
              <!-- ID -->
              <tr>
                <td>Id</td>
                <td>{{startup?.id}}</td>
              </tr>
    
              <!-- Created -->
              <tr>
                <td>Created</td>
                <td>{{startup?.created_at | date:'medium'}}</td>
              </tr>
    
              <!-- Last Updated -->
              <tr>
                <td>Last Updated</td>
                <td>{{startup?.updated_at | date:'medium'}}</td>
              </tr>

              <!-- Lead Angel -->
              <tr>
                <td>Lead Angel</td>
                <td>
                  <select class="form-control" formControlName="lead_angel_id">
                    <option *ngFor="let angel of angels | angelSorter:['first_name', 'last_name']" value="{{angel.id}}">{{angel.first_name}} {{angel.last_name}}</option>
                  </select>
                </td>
              </tr>
    
              <!-- Company Name -->
              <tr>
                <td>Company Name</td>
                <td><input class="form-control" formControlName="company_name"></td>
              </tr>
    
              <!-- Oneliner -->
              <tr>
                <td>Oneline</td>
                <td><input class="form-control" formControlName="oneliner"></td>
              </tr>
    
              <!-- Industry -->
              <tr>
                <td>Industry</td>
                <td><input class="form-control" formControlName="industry"></td>
              </tr>
    
              <!-- Website-->
              <tr>
                <td>Website</td>
                <td><input class="form-control" formControlName="website"></td>
              </tr>
    
              <!-- City-->
              <tr>
                <td>City</td>
                <td><input class="form-control" formControlName="city"></td>
              </tr>
    
              <!-- Country-->
              <tr>
                <td>Country</td>
                <td><input class="form-control" formControlName="country"></td>
              </tr>
              
              <!-- Entrepreneur Name -->
              <tr>
                <td>Entrepreneur Name</td>
                <td><input class="form-control" formControlName="entrepreneur_name"></td>
              </tr>
    
              <!-- Entrepreneur Email -->
              <tr>
                <td>Entrepreneur Email</td>
                <td><input class="form-control" formControlName="entrepreneur_email"></td>
              </tr>
    
              <!-- Entrepreneur Phone-->
              <tr>
                <td>Entrepreneur Phone</td>
                <td><input class="form-control" formControlName="entrepreneur_phone"></td>
              </tr>
    
              <!-- Round size and Open tickets -->
              <tr>
                <td>Round size and Open tickets</td>
                <td><input class="form-control" formControlName="round_size_and_open_tickets"></td>
              </tr>
    
              <!-- Valuation -->
              <tr>
                <td>Valuation</td>
                <td><input class="form-control" formControlName="valuation"></td>
              </tr>
    
              <!-- Already committed -->
              <tr>
                <td>Already committed</td>
                <td><input class="form-control" formControlName="committed_percentage"></td>
              </tr>
    
              <!-- Pitch Deck Link -->
              <tr>
                <td>Pitch Deck Link</td>
                <td><input class="form-control" formControlName="pitch_deck_link"></td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-success" (click)="saveChanges()">Save Changes</button>
          <a routerLink="/admin/startups" class="btn btn-secondary" >Discard Changes</a>
          <button class="btn btn-danger pull-right" (click)="deleteStartup()">Delete Startup</button>
        </form>
      </div>
    </div>
  `,
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
  ){}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.startupService.getStartup(params.get('startupId')))
      .subscribe((startup: Startup) => {
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
          'pitch_deck_link': startup.pitch_deck_link
        })
      });

    this.angelService.getAngels().then((angels) => this.angels = angels);
  }

  saveChanges(): void {
    const formData = this.startupForm.getRawValue();
    for(let k in formData) {
      if(formData.hasOwnProperty(k)) {
        this.startup[k] = formData[k];
      }
    }
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
