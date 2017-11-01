import { Component} from '@angular/core';

@Component({
  template: `
    <div class="row">
      <div class="col col-lg-2">
        <h3>Manage</h3>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link" routerLink="angels" routerLinkActive="active">Angels</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="documents" routerLinkActive="active">Documents</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="startups" routerLinkActive="active">Startups</a>
          </li>
        </ul>
      </div>
      <div class="col col-lg-10">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AdminComponent {

  constructor() {}

}
