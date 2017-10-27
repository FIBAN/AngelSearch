import {Component, Input, TemplateRef} from '@angular/core';

type Column = {name: string, key: string, cellTemplate: TemplateRef<any> | null}

@Component({
  selector: 'data-table',
  template: `
    <table class="table table-striped table-sm table-responsive">
      <thead>
        <th *ngFor="let column of columns">{{column.name}}</th>
      </thead>
      <tbody>
        <tr *ngFor="let row of tableData">
          <td *ngFor="let cell of row">
            <ng-container 
              *ngIf="cell.column.cellTemplate; else defaultCell" 
              [ngTemplateOutlet]="cell.column.cellTemplate"
              [ngTemplateOutletContext]="cell"
            ></ng-container>
            <ng-template #defaultCell><span>{{cell.$implicit}}</span></ng-template>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class DataTableComponent {
  private _columns: Column[];
  private _rows: any[];

  tableData: DataTableCellContext[][];

  @Input() set columns(cols: Column[]) {
    console.log('new cols');
    this._columns = cols;
    this.updateTableData();
  }
  get columns() {return this._columns};

  @Input() set rows(rows: any[]) {
    console.log('new rows');
    this._rows = rows;
    this.updateTableData();
  }

  constructor() {}

  private updateTableData() {
    if(this._rows && this._columns) {
      const data = [];
      for(let row of this._rows) {
        const rowCells = [];
        for (let column of this._columns) {
          rowCells.push(this.cellContext(row, column));
        }
        data.push(rowCells)
      }
      this.tableData = data;
    }
  }

  private cellContext(row: any, column: Column): DataTableCellContext {
    const context = new DataTableCellContext();
    context.$implicit = row[column.key];
    context.row = row;
    context.column = column;
    return context;
  }
}

export class DataTableCellContext {
  public $implicit: any = null;
  public row: any = null;
  public column: Column = null;
}
