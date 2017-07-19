import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

import { Angel } from './angel';
import { AngelService } from './angel.service';

@Component({
  selector: 'angels',
  templateUrl: 'angels.component.html',
  styleUrls: ['angels.component.css']
})
export class AngelsComponent implements OnInit {
  angels: Angel[];
  searchString: string;

  columns = [
    { name: 'Id', width: 250 },
    { name: 'Name' },
    { name: 'Age', width: 100 },
    { name: 'Email' },
    { name: 'City' },
    { name: 'Auth0 Id', prop: 'auth0_id', width: 250 }
  ];

  constructor(
    private angelService: AngelService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.angelService.getAngels()
      .then(angels => this.angels = angels);
  }

}
