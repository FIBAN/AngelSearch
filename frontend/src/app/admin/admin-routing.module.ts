import { NgModule }            from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "../auth/auth-guard.service";
import {AdminAuthGuard} from "../auth/admin-auth-guard.service";
import {AdminDocumentsComponent} from "./documents/admin-documents.component";
import {ManageDocumentComponent} from "./documents/manage-document.component";
import {AdminStartupsComponent} from "./startups/admin-startups.component";
import {ManageStartupComponent} from "./startups/manage-startup.component";
import {AdminComponent} from "./admin.component";

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'angels' },
      { path: 'angels', loadChildren: 'app/admin/angels/admin-angel.module#AdminAngelModule' },
      { path: 'documents', component: AdminDocumentsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'documents/:documentId', component: ManageDocumentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'startups', component: AdminStartupsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'startups/:startupId', component: ManageStartupComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
