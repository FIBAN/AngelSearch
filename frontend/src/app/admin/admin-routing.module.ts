import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import {AuthGuard} from "../auth/auth-guard.service";
import {AdminAuthGuard} from "../auth/admin-auth-guard.service";
import {AdminComponent} from "./angels/admin.component";
import {ManageAngelComponent} from "./angels/manage-angel.component";
import {BatchInsertComponent} from "./angels/batch-insert.component";
import {AdminDocumentsComponent} from "./documents/admin-documents.component";
import {ManageDocumentComponent} from "./documents/manage-document.component";
import {AdminStartupsComponent} from "./startups/admin-startups.component";
import {ManageStartupComponent} from "./startups/manage-startup.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'admin/edit-angel/:angelId', component: ManageAngelComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'admin/batch', component: BatchInsertComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'admin/documents', component: AdminDocumentsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'admin/documents/:documentId', component: ManageDocumentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'admin/startups', component: AdminStartupsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'admin/startups/:startupId', component: ManageStartupComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
