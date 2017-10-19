import {Component, Input, TemplateRef} from '@angular/core';

type Column = {name: string, key: string, cellTemplate: TemplateRef<any> | null}

@Component({
  selector: 'rich-table',
  template: `
    <table class="table">
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
export class RichTableComponent {
  private _columns: Column[];
  private _rows: any[];

  tableData: RichTableCellContext[][];

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

  updateTableData() {
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

  cellContext(row: any, column: Column): RichTableCellContext {
    const context = new RichTableCellContext();
    context.$implicit = row[column.key];
    context.row = row;
    context.column = column;
    return context;
  }
}

export class RichTableCellContext {
  public $implicit: any = null;
  public row: any = null;
  public column: Column = null;
}
