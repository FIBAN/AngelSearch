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

  sortBy: string = 'name';
  reverseSort: boolean = false;

  countries = [];
  cities = [];
  industries = [];

  investmentLevels = Angel.INVESTMENT_LEVELS;

  sortKeys = {
    'name': ['first_name', 'last_name'],
    'location': ['city', 'country'],
    'industries': ['industries'],
    'investments': ['investment_level'],
    'linkedin': ['linkedin']
  };

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

  onSort(column: string) {
    if(this.sortBy != column) {
      this.sortBy = column;
      this.reverseSort = false;
    }
    else {
      this.reverseSort = ! this.reverseSort;
    }
  }

}
