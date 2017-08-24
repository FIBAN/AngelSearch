import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AngelService} from "../angels/angel.service";

@Component({
  template: ``
})
export class RegisterComponent implements OnInit {

  constructor(
    private angelService: AngelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .switchMap((params: ParamMap) => {
          if (params.has("i")) {
            return this.angelService.acceptInvitation(params.get("i"))
              .then(() => this.router.navigate(['/']))
              .catch(() => this.router.navigate(['/error']));
          }
          else {
            this.router.navigate(['/'])
          }
        }
      ).subscribe();
  }
}
