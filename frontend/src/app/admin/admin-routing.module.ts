import { NgModule }            from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "../auth/auth-guard.service";
import {AdminAuthGuard} from "../auth/admin-auth-guard.service";
import {AdminDocumentsComponent} from "./documents/documents.component";
import {ManageDocumentComponent} from "./documents/manage-document.component";
import {StartupsComponent} from "./startups/startups.component";
import {ManageStartupComponent} from "./startups/manage-startup.component";
import {AdminComponent} from "./admin.component";
import {AddStartupComponent} from "./startups/add-startup.component";

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'angels' },
      { path: 'angels', loadChildren: 'app/admin/angels/admin-angel.module#AdminAngelModule' },
      { path: 'documents', component: AdminDocumentsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'documents/:documentId', component: ManageDocumentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'startups', component: StartupsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'startups/edit', pathMatch: 'full', redirectTo: 'startups' },
      { path: 'startups/edit/:startupId', component: ManageStartupComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'startups/add', component: AddStartupComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
