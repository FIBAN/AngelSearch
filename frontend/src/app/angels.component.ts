import {Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { AuthService } from './auth.service';

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
  searchString: string;

  columns = [];


  constructor(
    private angelService: AngelService,
    private authService: AuthService) {
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
      .then(angels => this.angels = angels);
  }

}
