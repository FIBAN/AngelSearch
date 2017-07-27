import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'daily-deals',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.css']
})
export class AppComponent {
  title = 'Angel Search';

  // We'll need to include a reference to our authService in the constructor to gain access to the API's in the view
  constructor(private authService: AuthService) {
  }
}
