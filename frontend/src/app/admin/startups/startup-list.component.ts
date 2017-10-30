import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

import { Angel } from '../../angels/angel';
import 'rxjs/add/operator/switchMap';
import {DataTableCellContext} from "../shared/data-table.component";

@Component({
  selector: 'admin-startup-list',
  template: `
    <data-table [columns]="columns" [rows]="startups"></data-table>

    <ng-template #idCell let-id>
      <span class="monospace small">{{id}}</span>
    </ng-template>

    <ng-template #createdAtCell let-created>
      <span>{{created | date:'short'}}</span>
    </ng-template>

    <ng-template #detailsCell let-startup="row">
      <a [routerLink]="['edit', startup.id]">View</a>
    </ng-template>
  `
})
export class StartupListComponent implements OnInit {
  @Input() startups: Angel[];

  @ViewChild('idCell') idCell: TemplateRef<DataTableCellContext>;
  @ViewChild('createdAtCell') createdAtCell: TemplateRef<DataTableCellContext>;
  @ViewChild('detailsCell') detailsCell: TemplateRef<DataTableCellContext>;

  columns: any[];

  constructor() {}

  ngOnInit(): void {
    this.columns = [
      {name: 'Id', key: 'id', cellTemplate: this.idCell},
      {name: 'Name', key: 'company_name'},
      {name: 'Created At', cellTemplate: this.createdAtCell},
      {name: '', cellTemplate: this.detailsCell}
    ]
  }

}
