import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { AuthService } from './auth.service';

import { Angel } from './angel';
import { AngelService } from './angel.service';

@Component({
  selector: 'angels',
  templateUrl: 'angels.component.html',
  styleUrls: ['angels.component.css']
})
export class AngelsComponent implements OnInit {
  @ViewChild('idLinkTmpl') idLinkTmpl: TemplateRef<any>;
  angels: Angel[];
  searchString: string;

  columns = [];


  constructor(
    private angelService: AngelService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.columns = [
      { name: 'Id', width: 250, draggable: false,
        cellTemplate: this.idLinkTmpl},
      { name: 'Name', draggable: false },
      { name: 'Age', width: 100, draggable: false },
      { name: 'Email', draggable: false },
      { name: 'City', draggable: false },
      { name: 'Auth0 Id', prop: 'auth0_id', width: 250, draggable: false }
    ];

    this.angelService.getAngels()
      .then(angels => this.angels = angels);
  }

}
