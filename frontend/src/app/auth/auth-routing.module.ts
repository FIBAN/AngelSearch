import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {EmailVerificationMissingComponent} from './email-verification-missing.component';
import {RegistrationNeededComponent} from './registration-needed.component';
import {RegisterComponent} from './register.component';
import {CallbackComponent} from './callback.component';
import {InviteComponent} from './invite.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'invite',
      component: InviteComponent
    },
    {
      path: 'callback',
      component: CallbackComponent,
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'sorry',
      component: RegistrationNeededComponent
    },
    {
      path: 'email-verification',
      component: EmailVerificationMissingComponent
    }
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
