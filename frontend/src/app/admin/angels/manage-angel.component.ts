import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Angel } from '../../angels/angel';
import { AngelService } from '../../angels/angel.service';
import { Utils } from "../../utils/parsers";

import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'admin-manage-angel',
  templateUrl: 'manage-angel.component.html'
})
export class ManageAngelComponent implements OnInit {
  @ViewChild('newIndustries') newIndustries: ElementRef;
  angel: Angel;

  angelForm: FormGroup;

  investmentLevels = Angel.INVESTMENT_LEVELS;

  industries: string[] = [];

  constructor(
    private angelService: AngelService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){}

  createAngelForm(a: Angel): void {
      this.angelForm = this.fb.group(
        {
        first_name: a.first_name,
        last_name: a.last_name,
        city: a.city,
        country: a.country,
        email: a.email,
        phone: a.phone,
        network: a.network,
        linkedin: a.linkedin,
        bio: a.bio,
        investment_level: a.investment_level
      });
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.angelService.getAngel(params.get('angelId')))
      .subscribe((angel: Angel) => {
        this.angel = angel;
        this.createAngelForm(angel);
        this.industries = angel.industries || [];
      });
  }

  removeIndustry(industry): void {
    const idx = this.industries.indexOf(industry);
    if(idx !== -1) {
      this.industries.splice(idx, 1);
    }
  }

  addNewIndustries(): void {
    const industries = this.newIndustries.nativeElement.value;
    if (industries) {
      for (let industry of industries.split(',')) {
        industry = industry.trim();
        const idx = this.industries.indexOf(industry);
        if (industry && idx === -1) {
          this.industries.push(industry);
        }
      }
      this.newIndustries.nativeElement.value = '';
    }
  }

  saveChanges(): void {
      this.addNewIndustries();
      const formData = this.angelForm.getRawValue();
      formData.linkedin = Utils.parseLinkedInId(formData.linkedin);
      for(let k in formData) {
        if(formData.hasOwnProperty(k)) {
          this.angel[k] = formData[k];
        }
      }
      this.angel.industries = this.industries;
      this.angelService.updateAngel(this.angel)
        .then(() => {
          location.reload();
        });
  }

}
