import { Component, OnInit} from '@angular/core';
import { AuthService } from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'landing',
  templateUrl: 'landing.component.html'
})
export class LandingComponent implements OnInit{

  constructor(
    public authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.authService.loggedIn$.subscribe((loggedIn) => {
        if(loggedIn) {
          this.router.navigate(['/angels'])
        }
      });
  }

}
