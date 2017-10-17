import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import {AuthGuard} from "../auth/auth-guard.service";
import {AdminAuthGuard} from "../auth/admin-auth-guard.service";
import {AdminAngelsComponent} from "./angels/admin-angels.component";
import {ManageAngelComponent} from "./angels/manage-angel.component";
import {BatchInsertComponent} from "./angels/batch-insert.component";
import {AdminDocumentsComponent} from "./documents/admin-documents.component";
import {ManageDocumentComponent} from "./documents/manage-document.component";
import {AdminStartupsComponent} from "./startups/admin-startups.component";
import {ManageStartupComponent} from "./startups/manage-startup.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', pathMatch: 'full', redirectTo: 'angels' },
    { path: 'angels', component: AdminAngelsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'angels/edit/:angelId', component: ManageAngelComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'angels/add/batch', component: BatchInsertComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'documents', component: AdminDocumentsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'documents/:documentId', component: ManageDocumentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'startups', component: AdminStartupsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'startups/:startupId', component: ManageStartupComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
