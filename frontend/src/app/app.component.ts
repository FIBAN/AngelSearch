import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'angel-search',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.css']
})
export class AppComponent {
  // We'll need to include a reference to our authService in the constructor to gain access to the API's in the view
  constructor(public authService: AuthService, public router: Router) {
  }
}
