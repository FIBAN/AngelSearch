import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminAuthGuard } from './auth/admin-auth-guard.service';

import { CallbackComponent } from './auth/callback.component';
import { AngelsComponent } from './angels/angels.component';
import { AngelDetailsComponent } from "./angels/angel-details.component";
import { AdminComponent } from "./admin/angels/admin.component";
import { LandingComponent } from "./landing.component";
import { InviteComponent } from "./auth/invite.component";
import { RegisterComponent } from "./auth/register.component";
import { RegistrationNeededComponent } from "./auth/registration-needed.component";
import { ErrorComponent } from "./error.component";
import { EmailVerificationMissingComponent } from "./auth/email-verification-missing.component";
import { BatchInsertComponent } from "./admin/angels/batch-insert.component";
import { ManageAngelComponent } from "./admin/angels/manage-angel.component";
import { AdminDocumentsComponent } from "./admin/documents/admin-documents.component";
import { ManageStartupComponent } from "./admin/startups/manage-startup.component";
import { AdminStartupsComponent } from "./admin/startups/admin-startups.component";
import {ManageDocumentComponent} from "./admin/documents/manage-document.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/edit-angel/:angelId',
    component: ManageAngelComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/batch',
    component: BatchInsertComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/documents',
    component: AdminDocumentsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/documents/:documentId',
    component: ManageDocumentComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/startups',
    component: AdminStartupsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/startups/:startupId',
    component: ManageStartupComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'invite',
    component: InviteComponent
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'sorry',
    component: RegistrationNeededComponent
  },
  {
    path: 'email-verification',
    component: EmailVerificationMissingComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
