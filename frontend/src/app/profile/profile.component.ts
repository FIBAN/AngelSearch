import { Component, OnInit} from '@angular/core';

import { Angel } from '../angels/angel';
import { AngelService } from '../angels/angel.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'angel-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  angel: Angel;
  activeEdit: string;
  edits: any;
  newIndustry: string;

  profileProps: any[] = [
    {name: 'Id', key: 'id', editable: false},
    {name: 'First name', key: 'first_name', editable: true},
    {name: 'Last name', key: 'last_name', editable: true},
    {name: 'Email', key: 'email', editable: true},
    {name: 'Phone', key: 'phone', editable: true},
    {name: 'City', key: 'city', editable: true},
    {name: 'Country', key: 'country', editable: true},
    {name: 'Network', key: 'network', editable: true},
    {name: 'LinkedIn', key: 'linkedin', editable: true},
    {name: 'Bio', key: 'bio', editable: true},
  ];

  constructor(
    private angelService: AngelService) {
    this.edits = {};
  }

  ngOnInit(): void {
    this.angelService.getMyAngel().then(angel => {
      this.angel = angel;
      for(let k in angel){
        if(angel.hasOwnProperty(k)) this.edits[k] = angel[k];
      }
      //deep copy industries array
      this.edits.industries = [];
      for (let i of angel.industries) {
        this.edits.industries.push(i);
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
    let toBeSavedEdits = {id: this.angel.id};
    toBeSavedEdits[key] = this.edits[key];
    this.angelService.updateAngel(toBeSavedEdits as Angel).then(() => location.reload())
  }

  removeIndustry(industry): void {
    const idx = this.edits.industries.indexOf(industry);
    if(idx !== -1) {
      this.edits.industries.splice(idx, 1);
    }
  }

  addIndustry(industry): void {
    const idx = this.edits.industries.indexOf(industry);
    if(industry && idx === -1) {
      this.edits.industries.push(industry);
    }
    this.newIndustry = "";
  }

}
