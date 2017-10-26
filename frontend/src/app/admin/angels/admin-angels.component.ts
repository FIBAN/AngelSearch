import { Component, OnInit} from '@angular/core';

import { Angel } from '../../angels/angel';
import { AngelService } from '../../angels/angel.service';

import 'rxjs/add/operator/switchMap';
import {AngelAdminService} from "./angel-admin.service";

@Component({
  template: ` 
    <div class="row">
      <div class="col">
        <h4>Angels</h4>
      </div>
      <div class="col text-right">
          <a routerLink="add" class="btn btn-primary mb-2">Add Angel</a>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <admin-angel-list 
          [angels]="angels" 
          [users]="users"
        ></admin-angel-list>
      </div>
    </div>
  `
})
export class AdminAngelsComponent implements OnInit {
  angels: Angel[];
  users: any[];

  constructor(
    private angelService: AngelService,
    private adminService: AngelAdminService) {
  }

  ngOnInit(): void {
    this.angelService.getAngels().then((angels: Angel[]) => this.angels = angels);
    this.adminService.getUsers().then((users: any[]) => this.users = users);
  }

}
