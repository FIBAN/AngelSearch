import { Component, Input, OnInit} from '@angular/core';
import { AuthService } from './auth.service';

import { Angel } from './angel';
import { AngelService } from './angel.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {AdminService} from "./admin.service";

@Component({
  selector: 'admin',
  templateUrl: 'admin.component.html',
  styleUrls: []
})
export class AdminComponent implements OnInit {
  angels: Angel[];
  users: any[];

  angelColumns = [];
  userColumns = [];
  selectedAngel = [];
  selectedUser = [];

  constructor(
    private angelService: AngelService,
    private adminService: AdminService,
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.angelService.getAngels().then((angels: Angel[]) => this.angels = angels);
    this.adminService.getUsers().then((users: any[]) => this.users = users);

    this.angelColumns = [
      { name: 'Id', width: 250, draggable: false},
      { name: 'First Name', prop: 'first_name', width: 100,  draggable: false },
      { name: 'Last Name', prop: 'last_name', width: 100, draggable: false },
      { name: 'Email', draggable: false },
      { name: 'Auth0 Id', prop: 'auth0_id', width: 250, draggable: false }
    ];

    this.userColumns = [
      { name: 'Id', prop: 'user_id', width: 250, draggable: false},
      { name: 'Name', width: 100,  draggable: false },
      { name: 'Email', draggable: false }
    ];
  }

  onSelect({ selected }) {
    console.log('Select Event', selected);
  }

  linkSelected() {
    if(this.selectedAngel[0] && this.selectedUser[0]) {
      const linkedAngel = this.selectedAngel[0];
      linkedAngel.auth0_id = this.selectedUser[0].user_id;
      this.angelService.updateAngel(linkedAngel).then(() => location.reload());
    }
  }


}
