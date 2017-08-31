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
  @ViewChild('idLinkTmpl') idLinkTmpl: TemplateRef<any>;
  @ViewChild('cityCountryTmpl') cityCountryTmpl: TemplateRef<any>;
  @ViewChild('nameTmpl') nameTmpl: TemplateRef<any>;
  angels: Angel[];

  filter: any = {};

  columns = [];

  countries = [];

  cities = [];

  constructor(private angelService: AngelService) {
  }

  ngOnInit(): void {
    this.columns = [
      { name: 'Name', prop: 'last_name', cellTemplate: this.nameTmpl, resizeable: false, flexGrow: 2 },
      { name: 'Email', resizeable: false, flexGrow: 2 },
      { name: 'Phone', resizeable: false, flexGrow: 1 },
      { name: 'Location', prop: 'city', cellTemplate: this.cityCountryTmpl, resizeable: false, flexGrow: 2 },
      { name: 'Bio', resizeable: false, flexGrow: 2 }
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
      });

  }

  filterChanged(filter): void {
    console.log("filter changed", filter);
    this.filter = filter;
  }

}
