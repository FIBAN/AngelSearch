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
    { name: 'Id', width: 250, draggable: false },
    { name: 'Name', draggable: false },
    { name: 'Age', width: 100, draggable: false },
    { name: 'Email', draggable: false },
    { name: 'City', draggable: false },
    { name: 'Auth0 Id', prop: 'auth0_id', width: 250, draggable: false }
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
