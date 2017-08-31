import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FormControl, FormGroup} from "@angular/forms";
import {AngelFilter} from "./angel-filter";

@Component({
  selector: 'angel-filter-controls',
  template: `
    <div class="panel panel-default">
      <div class="panel-body">
        <form class="form-inline" [formGroup]="filtersForm" novalidate>
          <label for="searchString">Search</label>
          <input class="form-control" placeholder="Search" id="searchString" formControlName="searchString"/>
          <label for="country">Country</label>
          <select class="form-control" id="country" formControlName="country">
            <option selected value="">Any</option>
            <option *ngFor="let c of countries" value="{{c.toLowerCase()}}">{{c}}</option>
          </select>
          <label for="city">City</label>
          <select class="form-control" id="city" formControlName="city">
            <option selected value="">Any</option>
            <option *ngFor="let c of cities" value="{{c.toLowerCase()}}">{{c}}</option>
          </select>
          <a class="btn btn-default" id="filterClearBtn" (click)="clearFilter()">Clear Filters</a>
        </form>
      </div>
    </div>
  `,
  styles: [
    '.form-inline .form-control {margin-right: 1em;}',
    '#filterClearBtn {float: right;}'
  ]
})
export class AngelFilterControlsComponent implements OnInit {
  @Output() filterChanged = new EventEmitter();

  @Input() countries: string[];
  @Input() cities: string[];

  filtersForm = new FormGroup({
    searchString: new FormControl(),
    country: new FormControl(),
    city: new FormControl()
  });
  filtersFormSub;

  formDefaults = {
    searchString: "",
    country: "",
    city: ""
  };

  constructor() {}

  ngOnInit(): void {
    this.filtersForm.setValue(this.formDefaults);

    this.filtersFormSub = this.filtersForm.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(s => {
        this.filterChanged.emit(new AngelFilter(
          s.searchString,
          s.country && [s.country],
          s.city && [s.city]
        ));
      })
  }

  ngOnDestroy(): void {
    this.filtersFormSub.unsubscribe();
  }

  clearFilter(): void {
    this.filtersForm.setValue(this.formDefaults);
  }

}
