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
  styles: ['tr.odd { background-color: #f2f2f2}']
})
export class AdminComponent implements OnInit {
  angels: Angel[];
  users: any[];

  selectedAngels = {};

  constructor(
    private angelService: AngelService,
    private adminService: AdminService,
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.angelService.getAngels().then((angels: Angel[]) => this.angels = angels);
    this.adminService.getUsers().then((users: any[]) => this.users = users);
  }

  auth0UserByAngel(angel) {
    return this.users && this.users.find(u => u.user_id === angel.auth0_id);
  }

  selectAngel(index) {
    this.selectedAngels[index] = !this.selectedAngels[index];
  }

  onAngelCreate(angel: Angel) {
    this.angelService.createAngel(angel)
      .then(() => location.reload())
  }



}
