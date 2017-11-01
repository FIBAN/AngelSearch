import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {AuthGuard} from '../auth/auth-guard.service';
import {AngelDetailsComponent} from './angel-details.component';
import {AngelsComponent} from './angels.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'angels', component: AngelsComponent, canActivate: [AuthGuard] },
    { path: 'angels/:angelId', component: AngelDetailsComponent, canActivate: [AuthGuard] }
  ])],
  exports: [RouterModule]
})
export class AngelRoutingModule {}
