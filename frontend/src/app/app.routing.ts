import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';

import { CallbackComponent } from './auth/callback.component';
import { AngelsComponent } from './angels/angels.component';
import { AngelDetailsComponent } from "./angels/angel-details.component";
import { ProfileComponent } from "./profile/profile.component"
import {AdminComponent} from "./admin/admin.component";
import {LandingComponent} from "./landing.component";
import {InviteComponent} from "./auth/invite.component";
import {RegisterComponent} from "./auth/register.component";
import {RegistrationNeededComponent} from "./auth/registration-needed.component";
import {ErrorComponent} from "./error.component";
import {EmailVerificationMissingComponent} from "./auth/email-verification-missing.component";

const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'angels',
    component: AngelsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'angels/:angelId',
    component: AngelDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
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
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
  CallbackComponent,
  AngelsComponent,
  AngelDetailsComponent,
  ProfileComponent,
  AdminComponent,
  LandingComponent,
  InviteComponent,
  RegisterComponent,
  RegistrationNeededComponent,
  ErrorComponent,
  EmailVerificationMissingComponent
];
