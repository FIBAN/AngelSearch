import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'back-button',
  template: `
    <div>
      <a class="btn btn-outline-secondary text-dark" (click)="navigateBack()"><i class="fa fa-angle-left" aria-hidden="true"></i> Back</a>
    </div>
  `
})
export class BackButtonComponent {

  constructor(private route: ActivatedRoute, private router: Router) {}

  navigateBack() {
    console.log('route', this.route.snapshot);
    this.router.navigate(['..'], {relativeTo: this.route})
  }
}
