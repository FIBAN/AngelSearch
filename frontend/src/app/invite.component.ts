import { Component, Input, OnInit} from '@angular/core';
import { AuthService } from './auth.service';

import { Angel } from './angel';
import { AngelService } from './angel.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'angel-invite',
  templateUrl: 'invite.component.html',
  styleUrls: ['invite.component.css']
})
export class InviteComponent implements OnInit {
  invitation: any;

  constructor(
    private angelService: AngelService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.authService.authenticated) {
      this.router.navigate(['/angels']);
    }
    this.route.queryParamMap
      .switchMap((params: ParamMap) =>
        this.angelService.getInvitation(params.get("i")))
      .subscribe((invitation: any) => this.invitation = invitation);
  }

  register(): void {
    this.authService.login('/register?i=' + this.invitation.id)
  }

}
