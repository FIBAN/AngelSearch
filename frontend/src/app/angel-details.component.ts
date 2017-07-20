import { Component, Input, OnInit} from '@angular/core';
import { AuthService } from './auth.service';

import { Angel } from './angel';
import { AngelService } from './angel.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'angel-details',
  templateUrl: 'angel-details.component.html',
  styleUrls: ['angel-details.component.css']
})
export class AngelDetailsComponent implements OnInit {
  angel: Angel;

  constructor(
    private angelService: AngelService,
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.route.paramMap
        .switchMap((params: ParamMap) =>
          this.angelService.getAngel(params.get('angelId')))
        .subscribe((angel: Angel) => this.angel = angel);
  }

}
