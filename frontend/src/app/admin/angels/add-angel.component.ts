import { Component} from '@angular/core';

import { Angel } from '../../angels/angel';
import { AngelService } from '../../angels/angel.service';
import {Router} from "@angular/router";

@Component({
  template: `
    <div>
      <a class="btn btn-outline-secondary text-dark" routerLink=".."><i class="fa fa-angle-left" aria-hidden="true"></i> Back</a>
    </div>
    <h3 class="text-center">New Angel</h3>
    <a routerLink="/admin/angels/add/batch" routerLinkActive="true">Add multiple angels</a>
    <new-angel-form (onSubmit)="onAngelCreate($event)"></new-angel-form>
  `
})
export class AddAngelComponent {

  constructor(
    private angelService: AngelService,
    private router: Router) {
  }

  onAngelCreate(angel: Angel) {
    this.angelService.createAngel(angel)
      .then(() => this.router.navigate(['..']))
  }

}
