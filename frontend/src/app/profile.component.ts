import { Component, Input, OnInit} from '@angular/core';
import { AuthService } from './auth.service';

import { Angel } from './angel';
import { AngelService } from './angel.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'angel-profile',
  templateUrl: 'profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {
  angel: Angel;

  constructor(
    private angelService: AngelService,
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.angelService.getMyAngel().then(angel => this.angel = angel);
  }

  saveChanges(): void {
    this.angelService.updateAngel(this.angel).then(() => location.reload())
  }

}
