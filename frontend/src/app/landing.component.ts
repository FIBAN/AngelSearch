import { Component, OnInit} from '@angular/core';
import { AuthService } from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'landing',
  templateUrl: 'landing.component.html'
})
export class LandingComponent implements OnInit{

  loggedIn = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.authService.authStatus$.subscribe((status) => {
        console.log('firing with status ', status);
        if(this.loggedIn === false && status !== AuthService.AUTH_STATUS.LOGGED_OUT) {
          this.loggedIn = true;
          this.router.navigate(['/angels']);
        }
      });
  }

}
