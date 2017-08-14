import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AngelService} from "./angel.service";
import {AuthService} from "./auth.service";

@Component({
  template: ``
})
export class RegisterComponent implements OnInit {

  constructor(
    private angelService: AngelService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .switchMap((params: ParamMap) => {
          if (params.has("i")) {
            if(this.authService.authenticated) console.log("logged in"); else console.log("not logged in");
            return this.angelService.acceptInvitation(params.get("i"))
              .then(() => this.router.navigate(['/']));
          }
          else {
            this.router.navigate(['/'])
          }
        }
      ).subscribe();
  }
}
