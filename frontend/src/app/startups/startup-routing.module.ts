import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { StartupsComponent }    from './startups.component';
import {AuthGuard} from "../auth/auth-guard.service";
import {StartupDetailsComponent} from "./startup-details.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'startups', component: StartupsComponent, canActivate: [AuthGuard] },
    { path: 'startups/:startupId', component: StartupDetailsComponent, canActivate: [AuthGuard] }
  ])],
  exports: [RouterModule]
})
export class StartupRoutingModule {}
