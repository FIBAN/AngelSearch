import { Component, Input, OnInit} from '@angular/core';
import { AuthService } from './auth.service';

import { Angel } from './angel';
import { AngelService } from './angel.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(
    private angelService: AngelService,
    private authService: AuthService,
    private route: ActivatedRoute) {
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
