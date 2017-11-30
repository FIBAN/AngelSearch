import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

import { AngelService } from '../angels/angel.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'angel-invite',
  templateUrl: 'invite.component.html',
  styleUrls: ['invite.component.css']
})
export class InviteComponent implements OnInit {
  @ViewChildren('registrationOverrideInput') registrationOverrideInput: QueryList<ElementRef>;
  invitation: any;
  notProductionEnvironment =  ! environment.production;

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
        this.angelService.getInvitation(params.get('i')))
      .subscribe((invitation: any) => this.invitation = invitation);
  }

  register(): void {
    if (this.notProductionEnvironment &&
      this.registrationOverrideInput.find(e => e.nativeElement.checked && e.nativeElement.value === 'true')
    ) {
      this.authService.login({
        redirectAfterLogin: '/register?i=' + this.invitation.id,
        invitationId: this.invitation.id,
        developmentRegisterationAngelIdOverride: this.invitation.angel_id
      });
    }
    else {
      this.authService.login({
        redirectAfterLogin: '/register?i=' + this.invitation.id,
        invitationId: this.invitation.id
      });
    }
  }

}
