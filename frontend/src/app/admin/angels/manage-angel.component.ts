import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Angel } from '../../angels/angel';
import { AngelService } from '../../angels/angel.service';
import { Utils } from '../../utils/parsers';

import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  templateUrl: 'manage-angel.component.html'
})
export class ManageAngelComponent implements OnInit {
  @ViewChild('newIndustries') newIndustries: ElementRef;
  angel: Angel;

  angelForm: FormGroup;

  investmentLevels = Angel.INVESTMENT_LEVELS;

  industries: string[] = [];

  invitations: any[];

  message = '';

  constructor(
    private angelService: AngelService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

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
      investment_level: a.investment_level,
      is_hidden: String(a.is_hidden)
    });

    this.industries = a.industries && a.industries.slice(0) || [];
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
    return angel && this.invitations && this.invitations.filter(i => i.angel_id === angel.id);
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

  updateIndustries(newIndustries) {
    this.industries = newIndustries;
  }

  saveChanges(): void {
      const formData = this.angelForm.getRawValue();
      formData.linkedin = Utils.parseLinkedInId(formData.linkedin);
      formData.is_hidden = formData.is_hidden === 'true';
      for (const k in formData) {
        if (formData.hasOwnProperty(k)) {
          this.angel[k] = formData[k];
        }
      }
      this.angel.industries = this.industries;
      this.angelService.updateAngel(this.angel)
        .then((updatedAngel) => {
          this.angel = updatedAngel;
          this.resetForm(updatedAngel);
          this.showMessage('Changes saved');
        });
  }

  discardChanges(): void {
      this.resetForm(this.angel);
      this.showMessage('Changes discarded');
  }

  showMessage(message) {
      this.message = message;
      setTimeout(() => this.message = '', 3000);
  }

}
