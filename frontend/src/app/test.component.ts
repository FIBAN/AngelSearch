import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  template: `
    <h3>Test page</h3>
    <rich-table [columns]="columns" [rows]="data"></rich-table>
    
    <ng-template #nameColumn let-default let-row="row" let-column="column">
      <a *ngIf="log(default)" href="#">Sir {{default}}</a>
    </ng-template>
    
    <ng-template #ageColumn let-age>
      <span [class.text-danger]="age > 30">{{age}}</span>
    </ng-template>
  `
})
export class TestComponent implements OnInit {
  @ViewChild('nameColumn') nameColumnTemplate: TemplateRef<any>;
  @ViewChild('ageColumn') ageColumnTemplate: TemplateRef<any>;

  columns: any[];
  data: any[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.nameColumnTemplate);
    this.columns = [
      {name: 'Name', key: 'name', cellTemplate: this.nameColumnTemplate},
      {name: 'Age', key: 'age', cellTemplate: this.ageColumnTemplate},
    ];

    this.data = [
      {name: 'Bob', age: 23},
      {name: 'Charlie', age: 37},
      {name: 'Aladdin', age: 29},
      {name: 'Mike', age: 25},
      {name: 'Jennie', age: 24},
      {name: 'Charlotte', age: 25},
      {name: 'Joe', age: 54},
      {name: 'Sam', age: 16},
    ];
  }

  log(any) {
    console.log(any);
    return true;
  }
}
