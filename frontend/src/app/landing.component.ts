import { Component, OnInit} from '@angular/core';
import { AuthService } from "./auth/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'landing',
  templateUrl: 'landing.component.html'
})
export class LandingComponent implements OnInit {

  loggedIn = false;

  private authStatusSub: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
     this.authStatusSub = this.authService.authStatus$.distinctUntilChanged().subscribe((status) => {
        if(this.loggedIn === false && status !== AuthService.AUTH_STATUS.LOGGED_OUT) {
          this.loggedIn = true;
          this.router.navigate(['/angels']);
        }
      });
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
