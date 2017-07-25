import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { CallbackComponent } from './callback.component';
import { AngelsComponent } from './angels.component';
import { AngelDetailsComponent } from "./angel-details.component";
import { ProfileComponent } from "./profile.component"

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/angels',
    pathMatch: 'full'
  },
  {
    path: 'angels',
    component: AngelsComponent
  },
  {
    path: 'angels/:angelId',
    component: AngelDetailsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent,
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [CallbackComponent, AngelsComponent, AngelDetailsComponent, ProfileComponent];
