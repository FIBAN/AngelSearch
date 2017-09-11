import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FormControl, FormGroup} from "@angular/forms";
import {AngelFilter} from "./angel-filter";

@Component({
  selector: 'angel-filter-controls',
  template: `
    <div class="card mb-3">
      <div class="card-header">Filters</div>
      <div class="card-body">
        <form [formGroup]="filtersForm" novalidate>
          <div class="form-row align-items-center">
            <div class="col-lg-3 col-12 mb-lg-0 mb-2">
              <label for="searchString" class="sr-only">Search</label>
              <input class="form-control" placeholder="Search" id="searchString" formControlName="searchString"/>
            </div>
            <div class="col-lg-2 col-12 mb-lg-0 mb-2">
              <label for="country" class="sr-only">Country</label>
              <select class="form-control" id="country" formControlName="country">
                <option selected value="">Country</option>
                <option *ngFor="let c of countries" value="{{c.toLowerCase()}}">{{c}}</option>
              </select>          
            </div>
            <div class="col-lg-2 col-12 mb-lg-0 mb-2">
              <label for="city" class="sr-only">City</label>
              <select class="form-control" id="city" formControlName="city">
                <option selected value="">City</option>
                <option *ngFor="let c of cities" value="{{c.toLowerCase()}}">{{c}}</option>
              </select>            
            </div>
            <div class="col-lg-2 col-12 mb-lg-0 mb-2">
              <label for="industry" class="sr-only">Industry</label>
              <select class="form-control" id="industry" formControlName="industry">
                <option selected value="">Industry</option>
                <option *ngFor="let i of industries" value="{{i.toLowerCase()}}">{{i}}</option>
              </select>            
            </div>
            <div class="col-lg-3 col-12 mb-lg-0 mb-2">
              <button class="btn btn-secondary" id="filterClearBtn" (click)="clearFilter()">Clear Filters</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class AngelFilterControlsComponent implements OnInit {
  @Output() filterChanged = new EventEmitter();

  @Input() countries: string[];
  @Input() cities: string[];
  @Input() industries: string[];

  filtersForm = new FormGroup({
    searchString: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    industry: new FormControl()
  });
  filtersFormSub;

  formDefaults = {
    searchString: "",
    country: "",
    city: "",
    industry: ""
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
          s.city && [s.city],
          s.industry && [s.industry]
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
