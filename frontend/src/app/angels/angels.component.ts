import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';

import { Angel } from './angel';
import { AngelService } from './angel.service';

@Component({
  selector: 'angels',
  templateUrl: 'angels.component.html',
  styleUrls: ['angels.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AngelsComponent implements OnInit {
  @ViewChild('cityCountryTmpl') cityCountryTmpl: TemplateRef<any>;
  @ViewChild('nameTmpl') nameTmpl: TemplateRef<any>;
  @ViewChild('industriesTmpl') industriesTmpl: TemplateRef<any>;
  @ViewChild('linkedInTmpl') linkedInTmpl: TemplateRef<any>;
  angels: Angel[];

  filter: any = {};

  columns = [];

  countries = [];
  cities = [];
  industries = [];

  constructor(private angelService: AngelService) {
  }

  ngOnInit(): void {
    this.columns = [
      { name: 'Name', prop: 'first_name', cellTemplate: this.nameTmpl, resizeable: false, flexGrow: 2 },
      { name: 'Location', prop: 'city', cellTemplate: this.cityCountryTmpl, resizeable: false, flexGrow: 2 },
      { name: 'Industries', prop: 'industries', cellTemplate: this.industriesTmpl, resizeable: false, flexGrow: 3},
      { name: 'Bio', resizeable: false, flexGrow: 4 },
      { name: 'LinkedIn', prop: 'linkedin', cellTemplate: this.linkedInTmpl, resizeable: false, flexGrow: 1}
    ];

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

}
