import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminAuthGuard } from './auth/admin-auth-guard.service';

import { CallbackComponent } from './auth/callback.component';
import { AngelsComponent } from './angels/angels.component';
import { AngelDetailsComponent } from "./angels/angel-details.component";
import { ProfileComponent } from "./profile/profile.component"
import { AdminComponent } from "./admin/admin.component";
import { AdminAngelListComponent } from "./admin/admin-angel-list.component";
import { LandingComponent } from "./landing.component";
import { InviteComponent } from "./auth/invite.component";
import { RegisterComponent } from "./auth/register.component";
import { RegistrationNeededComponent } from "./auth/registration-needed.component";
import { ErrorComponent } from "./error.component";
import { EmailVerificationMissingComponent } from "./auth/email-verification-missing.component";
import { BatchInsertComponent } from "./admin/batch-insert.component";
import {ManageAngelComponent} from "./admin/manage-angel.component";
import {DocumentsComponent} from "./documents/documents.component";
import {AdminDocumentsComponent} from "./admin/admin-documents.component";
import {ManageStartupComponent} from "./admin/manage-startup.component";
import {AdminStartupsComponent} from "./admin/admin-startups.component";

const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'angels',
    component: AngelsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'angels/:angelId',
    component: AngelDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
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

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
  CallbackComponent,
  AngelsComponent,
  AngelDetailsComponent,
  DocumentsComponent,
  ProfileComponent,
  AdminComponent,
  ManageAngelComponent,
  AdminAngelListComponent,
  AdminDocumentsComponent,
  AdminStartupsComponent,
  ManageStartupComponent,
  LandingComponent,
  InviteComponent,
  RegisterComponent,
  RegistrationNeededComponent,
  ErrorComponent,
  EmailVerificationMissingComponent,
  BatchInsertComponent
];
