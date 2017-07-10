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

  constructor(
    private angelService: AngelService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.angelService.getAngels()
      .then(angels => this.angels = angels);
  }

}
