import {Component, HostListener, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';

import { Angel } from './angel';
import { AngelService } from './angel.service';

@Component({
  selector: 'angels',
  templateUrl: 'angels.component.html',
  styleUrls: ['angels.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AngelsComponent implements OnInit {
  angels: Angel[];

  filter: any = {};

  sortBy: string = 'first_name';
  reverseSort: boolean = false;

  countries = [];
  cities = [];
  industries = [];

  investmentLevels = Angel.INVESTMENT_LEVELS;

  constructor(private angelService: AngelService) {
  }

  ngOnInit(): void {

    this.angelService.getAngels()
      .then(angels => {
        this.angels = angels;
        this.countries = angels.map(a => a.country)
          .filter((v, i, a) => v && a.indexOf(v) === i) //discard null values and duplicates
          .sort();
        this.cities = angels.map(a => a.city)
          .filter((v, i, a) => v && a.indexOf(v) === i) //discard null values and duplicates
          .sort();
        this.industries = angels.map(a => a.industries || [])
          .reduce((x,y) => x.concat(y), [])
          .filter((v, i, a) => v && a.indexOf(v) === i) //discard null values and duplicates
          .sort();
      });

  }

  filterChanged(filter): void {
    console.log("filter changed", filter);
    this.filter = filter;
  }

  locationString(city?: string, country?: string): string {
    if(city && country) {
      return city + ', ' + country;
    }
    else {
      return city || country || '';
    }
  }

  onSort(key: string) {
    if(this.sortBy != key) {
      this.sortBy = key;
      this.reverseSort = false;
    }
    else {
      this.reverseSort = ! this.reverseSort;
    }
  }

}
