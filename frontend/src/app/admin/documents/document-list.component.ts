import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {DataTableCellContext} from "../shared/data-table.component";

@Component({
  selector: 'admin-document-list',
  template: `
    <data-table [columns]="columns" [rows]="documents|childOfDocument:currentFolderId"></data-table>

    <ng-template #idCell let-id>
      <span class="monospace small">{{id}}</span>
    </ng-template>

    <ng-template #nameCell let-name let-document="row">
      <span *ngIf="document.type !== 'folder'">{{name}}</span>
      <a *ngIf="document.type === 'folder'" routerLink="." [queryParams]="{parent: document.id}">{{name}}</a>
    </ng-template>

    <ng-template #createdAtCell let-created>
      <span>{{created | date:'shortDate'}}</span>
    </ng-template>

    <ng-template #detailsCell let-document="row">
      <a [routerLink]="['edit', document.id]">Edit</a>
    </ng-template>
  `
})
export class DocumentListComponent implements OnInit {
  @Input() documents: Document[];
  @Input() currentFolderId: string|null;

  @ViewChild('idCell') idCell: TemplateRef<DataTableCellContext>;
  @ViewChild('nameCell') nameCell: TemplateRef<DataTableCellContext>;
  @ViewChild('createdAtCell') createdAtCell: TemplateRef<DataTableCellContext>;
  @ViewChild('detailsCell') detailsCell: TemplateRef<DataTableCellContext>;

  columns: any[];

  constructor() {}

  ngOnInit(): void {
    this.columns = [
      {name: 'Id', key: 'id', cellTemplate: this.idCell},
      {name: 'Name', key: 'name', cellTemplate: this.nameCell},
      {name: 'Type', key: 'type'},
      {name: 'Created At', key: 'created_at', cellTemplate: this.createdAtCell},
      {name: '', cellTemplate: this.detailsCell}
    ]
  }

}
