import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { CallbackComponent } from './callback.component';
import { AngelsComponent } from './angels.component';
import { AngelDetailsComponent } from "./angel-details.component";
import { ProfileComponent } from "./profile.component"
import {AdminComponent} from "./admin.component";
import {LandingComponent} from "./landing.component";
import {InviteComponent} from "./invite.component";

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
  InviteComponent
];
