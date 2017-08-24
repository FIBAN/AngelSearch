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
  newEmail: string;
  activeEdit: string;
  edits: any;

  profileProps: any[] = [
    {name: 'Id', key: 'id', editable: false},
    {name: 'First name', key: 'first_name', editable: true},
    {name: 'Last name', key: 'last_name', editable: true},
    {name: 'Email', key: 'email', editable: true},
    {name: 'Phone', key: 'phone', editable: true},
    {name: 'City', key: 'city', editable: true},
    {name: 'Country', key: 'country', editable: true}
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
    });
  }

  startEdit(key): void {
    this.activeEdit = key;
  }

  stopEdit(): void {
    this.activeEdit = "";
  }

  saveEdit(key): void {
    this.angel[key] = this.edits[key];
    this.angelService.updateAngel(this.angel).then(() => location.reload())
  }

  changeEmail(): void {
    this.angel.email = this.newEmail;
    this.angelService.updateAngel(this.angel).then(() => location.reload())
  }

}
