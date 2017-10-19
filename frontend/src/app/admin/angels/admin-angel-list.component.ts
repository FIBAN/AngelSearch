import {Component, Input, OnInit} from '@angular/core';

import { Angel } from '../../angels/angel';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'admin-angel-list',
  templateUrl: 'admin-angel-list.component.html',
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
  @Input() invitations: any[];

  @Input() onSendInvite: (angel) => void;

  constructor() {}

  ngOnInit(): void {}

}
