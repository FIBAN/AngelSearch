import { Component, OnInit} from '@angular/core';

import { Angel } from '../angels/angel';
import { AngelService } from '../angels/angel.service';

import 'rxjs/add/operator/switchMap';
import {AdminService} from "./admin.service";

@Component({
  selector: 'admin',
  template: `
    <h3 class="text-center">Admin tools</h3>

    <h4>Angels</h4>
    <admin-angel-list 
      [angels]="angels" 
      [users]="users" 
      [invitations]="invitations" 
      [onSendInvite]="onSendInvite.bind(this)"
    ></admin-angel-list>

    <h4>Create user</h4>
    <new-angel-form (onSubmit)="onAngelCreate($event)"></new-angel-form>
  `
})
export class AdminComponent implements OnInit {
  angels: Angel[];
  users: any[];
  invitations: any[];

  constructor(
    private angelService: AngelService,
    private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.angelService.getAngels().then((angels: Angel[]) => this.angels = angels);
    this.adminService.getUsers().then((users: any[]) => this.users = users);
    this.angelService.getInvitations().then((invitations: any[]) => this.invitations = invitations);
  }

  onSendInvite(angel) {
    this.angelService.createInvite(angel.id).then(() => this.ngOnInit());
  }

  onAngelCreate(angel: Angel) {
    this.angelService.createAngel(angel)
      .then(() => location.reload())
  }

}
