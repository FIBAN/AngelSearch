import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngelsComponent} from './angels.component';
import {AuthGuard} from '../../auth/auth-guard.service';
import {AddMultipleAngelsComponent} from './add-multiple-angels.component';
import {AdminAuthGuard} from '../../auth/admin-auth-guard.service';
import {AddAngelComponent} from './add-angel.component';
import {ManageAngelComponent} from './manage-angel.component';


export const routes: Routes = [
    { path: '', component: AngelsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'edit', pathMatch: 'full', redirectTo: '' },
    { path: 'edit/:angelId', component: ManageAngelComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'add', component: AddAngelComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'add/batch', component: AddMultipleAngelsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAngelRoutingModule {}
