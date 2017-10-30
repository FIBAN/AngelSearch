import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

import { Angel } from '../../angels/angel';
import 'rxjs/add/operator/switchMap';
import {DataTableCellContext} from "../shared/data-table.component";

@Component({
  selector: 'admin-angel-list',
  templateUrl: 'angel-list.component.html'
})
export class AngelListComponent implements OnInit {
  @Input() angels: Angel[];
  @Input() users: any[];

  @ViewChild('idCell') idCell: TemplateRef<DataTableCellContext>;
  @ViewChild('nameCell') nameCell: TemplateRef<DataTableCellContext>;
  @ViewChild('lastLoginCell') lastLoginCell: TemplateRef<DataTableCellContext>;
  @ViewChild('detailsCell') detailsCell: TemplateRef<DataTableCellContext>;

  columns: any[];

  constructor() {}

  ngOnInit(): void {
    this.columns = [
      {name: 'Id', key: 'id', cellTemplate: this.idCell},
      {name: 'Name', cellTemplate: this.nameCell},
      {name: 'Email', key: 'email'},
      {name: 'Last Login', cellTemplate: this.lastLoginCell},
      {name: '', cellTemplate: this.detailsCell}
    ]
  }

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
