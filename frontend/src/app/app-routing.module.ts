import { Routes, RouterModule} from '@angular/router';

import { CallbackComponent } from './auth/callback.component';
import { LandingComponent } from "./landing.component";
import { InviteComponent } from "./auth/invite.component";
import { RegisterComponent } from "./auth/register.component";
import { RegistrationNeededComponent } from "./auth/registration-needed.component";
import { ErrorComponent } from "./error.component";
import { EmailVerificationMissingComponent } from "./auth/email-verification-missing.component";
import {NgModule} from "@angular/core";
import {TestComponent} from "./test.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
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
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
