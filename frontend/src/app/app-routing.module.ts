import { Routes, RouterModule} from '@angular/router';

import { LandingComponent } from './landing.component';
import { ErrorComponent } from './error.component';
import {NgModule} from '@angular/core';

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
    path: 'error',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*, {enableTracing: true} */ )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
