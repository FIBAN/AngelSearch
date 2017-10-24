import { Component} from '@angular/core';

import { Angel } from '../../angels/angel';
import { AngelService } from '../../angels/angel.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  template: `
    <back-button></back-button>
    <h3 class="text-center">New Angel</h3>
    <a routerLink="/admin/angels/add/batch" routerLinkActive="true">Add multiple angels</a>
    <new-angel-form (onSubmit)="onAngelCreate($event)"></new-angel-form>
  `
})
export class AddAngelComponent {

  constructor(
    private angelService: AngelService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  onAngelCreate(angel: Angel) {
    this.angelService.createAngel(angel)
      .then(() => this.router.navigate(['..'], {relativeTo: this.route}))
  }

}
