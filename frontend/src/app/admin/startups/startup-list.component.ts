import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

import { Angel } from '../../angels/angel';
import 'rxjs/add/operator/switchMap';
import {DataTableCellContext} from '../shared/data-table.component';

@Component({
  selector: 'admin-startup-list',
  template: `
    <nban-data-table [columns]="columns" [rows]="startups"></nban-data-table>

    <ng-template #idCell let-id>
      <span class="monospace small">{{id}}</span>
    </ng-template>

    <ng-template #createdAtCell let-created>
      <span>{{created | date:'shortDate'}}</span>
    </ng-template>

    <ng-template #statusCell let-status>
      <span *ngIf="status === 'active'" class="text-success status-symbol"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>
      <span *ngIf="status !== 'active'" class="text-danger status-symbol"><i class="fa fa-times" aria-hidden="true"></i></span>
    </ng-template>

    <ng-template #detailsCell let-startup="row">
      <a [routerLink]="['edit', startup.id]">View</a>
    </ng-template>
  `,
  styles: [
    'span.status-symbol { font-size: large; }'
  ]
})
export class StartupListComponent implements OnInit {
  @Input() startups: Angel[];

  @ViewChild('idCell') idCell: TemplateRef<DataTableCellContext>;
  @ViewChild('createdAtCell') createdAtCell: TemplateRef<DataTableCellContext>;
  @ViewChild('detailsCell') detailsCell: TemplateRef<DataTableCellContext>;
  @ViewChild('statusCell') statusCell: TemplateRef<DataTableCellContext>;

  columns: any[];

  constructor() {}

  ngOnInit(): void {
    this.columns = [
      {name: 'Id', key: 'id', cellTemplate: this.idCell},
      {name: 'Name', key: 'company_name'},
      {name: 'Created At', key: 'created_at', cellTemplate: this.createdAtCell},
      {name: 'Active', key: 'status', cellTemplate: this.statusCell},
      {name: '', cellTemplate: this.detailsCell}
    ]
  }

}
