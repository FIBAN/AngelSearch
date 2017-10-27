import {Component, Input, OnInit} from '@angular/core';

import { Angel } from '../../angels/angel';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'admin-angel-list',
  templateUrl: 'angel-list.component.html',
  styles: [
    'tr.odd { background-color: #f2f2f2; }',
    'tr.details-row td { border-top: none }',
    'tr.invitation-row td:first-child { width: 1%; white-space: nowrap; }',
    'table.invitations-table { background-color: inherit; }'
  ]
})
export class AdminAngelListComponent implements OnInit {
  @Input() angels: Angel[];
  @Input() users: any[];

  constructor() {}

  ngOnInit(): void {}

  lastLoginForAngel(angel: Angel): string {
    if(this.users) {
      return this.findLastLogin(this.users, angel.id);
    } else {
      return "";
    }
  }

  private findLastLogin(users, angelId): string {
    const accountLoginsSorted = users
      .filter(u => u.angel_id === angelId)
      .map(u => u.last_login)
      .sort()
      .reverse();

    return (accountLoginsSorted && accountLoginsSorted.length) ? accountLoginsSorted[0] : "";
  }

}
