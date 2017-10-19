import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Angel } from '../../angels/angel';
import { AngelService } from '../../angels/angel.service';
import { Utils } from "../../utils/parsers";

import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { FormBuilder, FormGroup} from "@angular/forms";
import {AngelAdminService} from "./angel-admin.service";

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

  invitations: any[]

  message = "";

  constructor(
    private angelService: AngelService,
    private angelAdminService: AngelAdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){}

  resetForm(a: Angel): void {
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

    this.industries = a.industries || [];
  }

  ngOnInit(): void {
    this.angelService.getInvitations().then((invitations: any[]) => this.invitations = invitations);
    this.route.paramMap
      .switchMap((params: ParamMap) => this.angelService.getAngel(params.get('angelId')))
      .subscribe((angel: Angel) => {
        this.angel = angel;
        this.resetForm(angel);
      });
  }

  invitationsByAngel(angel) {
    return this.invitations && this.invitations.filter(i => i.angel_id === angel.id);
  }

  inviteUrl(inviteId: string) {
    return location.protocol + '//' + location.host + '/invite?i=' + inviteId;
  }

  sendInvite(angel) {
    this.onSendInvite(angel);
  }

  onSendInvite(angel) {
    this.angelService.createInvite(angel.id).then(() => this.ngOnInit());
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
        .then((updatedAngel) => {
          this.angel = updatedAngel;
          this.resetForm(updatedAngel);
          this.showMessage("Changes saved");
        });
  }

  discardChanges(): void {
      this.resetForm(this.angel);
      this.showMessage("Changes discarded");
  }

  showMessage(message) {
      this.message = message;
      setTimeout(() => this.message = "", 3000);
  }

}
