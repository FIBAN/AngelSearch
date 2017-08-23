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
  styles: [
    'tr.odd { background-color: #f2f2f2;}',
    '.auth0-registered-icon { color: #22b24c; font-size: large;}'
  ]
})
export class AdminComponent implements OnInit {
  angels: Angel[];
  users: any[];
  invitations: any[];

  selectedAngels = {};

  constructor(
    private angelService: AngelService,
    private adminService: AdminService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.angelService.getAngels().then((angels: Angel[]) => this.angels = angels);
    this.adminService.getUsers().then((users: any[]) => this.users = users);
    this.angelService.getInvitations().then((invitations: any[]) => this.invitations = invitations);
  }

  auth0UserByAngel(angel) {
    return this.users && this.users.find(u => u.user_id === angel.auth0_id);
  }

  invitationsByAngel(angel) {
    return this.invitations && this.invitations.filter(i => i.angel_id === angel.id);
  }

  sendInvite(angel) {
    this.angelService.createInvite(angel.id).then(() => this.ngOnInit());
  }

  selectAngel(index) {
    this.selectedAngels[index] = !this.selectedAngels[index];
  }

  onAngelCreate(angel: Angel) {
    this.angelService.createAngel(angel)
      .then(() => location.reload())
  }

  inviteUrl(inviteId: string) {
    return location.protocol + '//' + location.host + '/invite?i=' + inviteId;
  }



}
