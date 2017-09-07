import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import { Angel } from '../angels/angel';
import { AngelService } from '../angels/angel.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'angel-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('industriesViewTmpl') industriesViewTmpl: TemplateRef<any>;
  @ViewChild('industriesEditTmpl') industriesEditTmpl: TemplateRef<any>;
  @ViewChild('investmentLevelViewTmpl') investmentLevelViewTmpl: TemplateRef<any>;
  @ViewChild('investmentLevelEditTmpl') investmentLevelEditTmpl: TemplateRef<any>;
  angel: Angel;
  activeEdit: string;
  edits: any;
  newIndustry: string;

  profileProps: any[];

  saving: string;

  investmentLevels = Angel.INVESTMENT_LEVELS;

  constructor(private angelService: AngelService) {
    this.edits = {};
  }

  ngOnInit(): void {
    this.profileProps = [
      {name: 'Id', key: 'id', editable: false},
      {name: 'First name', key: 'first_name', editable: true},
      {name: 'Last name', key: 'last_name', editable: true},
      {name: 'Email', key: 'email', editable: true},
      {name: 'Phone', key: 'phone', editable: true},
      {name: 'City', key: 'city', editable: true},
      {name: 'Country', key: 'country', editable: true},
      {name: 'Network', key: 'network', editable: true},
      {name: 'LinkedIn', key: 'linkedin', editable: true},
      {name: 'Investments', key: 'investment_level', editable: true, viewTemplate: this.investmentLevelViewTmpl, editTemplate: this.investmentLevelEditTmpl},
      {name: 'Industries', key: 'industries', editable: true, viewTemplate: this.industriesViewTmpl, editTemplate: this.industriesEditTmpl},
      {name: 'Bio', key: 'bio', editable: true},
    ];

    this.loadProfile();
  }

  loadProfile(): Promise<void> {
    this.edits = {};
    this.activeEdit = "";
    return this.angelService.getMyAngel().then(angel => {
      this.angel = angel;
      for(let k in angel){
        if(angel.hasOwnProperty(k)) this.edits[k] = angel[k];
      }
      //deep copy industries array
      this.edits.industries = [];
      if(angel.industries) {
        for (let i of angel.industries) {
          this.edits.industries.push(i);
        }
      }
    });
  }

  startEdit(key): void {
    this.activeEdit = key;
  }

  stopEdit(): void {
    this.activeEdit = "";
  }

  saveEdit(key): void {
    if(key === 'linkedin') {
      this.edits.linkedin = this.parseLinkedInId(this.edits.linkedin);
    }
    let toBeSavedEdits = {id: this.angel.id};
    toBeSavedEdits[key] = this.edits[key];
    this.activeEdit = "";
    this.saving = key;
    this.angelService.updateAngel(toBeSavedEdits as Angel)
      .then(() => this.loadProfile())
      .then(() => this.saving = "")
      .catch(() => location.reload());
  }

  parseLinkedInId(input: string): string {
    const urlMatch = input.match(/\/in\/([^/]*)\/?/); //check if input is a linkedIn profile url
    const idMatch = input.match(/^([^/]*)$/); //otherwise check if input looks like a linkedIn id string
    return (urlMatch && urlMatch[1]) || (idMatch && idMatch[1]) || "";
  }

  removeIndustry(industry): void {
    const idx = this.edits.industries.indexOf(industry);
    if(idx !== -1) {
      this.edits.industries.splice(idx, 1);
    }
  }

  addIndustry(industries): void {
    if (industries) {
      for (let industry of industries.split(',')) {
        industry = industry.trim();
        const idx = this.edits.industries.indexOf(industry);
        if (industry && idx === -1) {
          this.edits.industries.push(industry);
        }
      }
    }
    this.newIndustry = "";
  }

}
