import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminAuthGuard } from './auth/admin-auth-guard.service';

import { CallbackComponent } from './auth/callback.component';
import { AngelsComponent } from './angels/angels.component';
import { AngelDetailsComponent } from "./angels/angel-details.component";
import { ProfileComponent } from "./profile/profile.component"
import { AdminComponent } from "./admin/angels/admin.component";
import { AdminAngelListComponent } from "./admin/angels/admin-angel-list.component";
import { LandingComponent } from "./landing.component";
import { InviteComponent } from "./auth/invite.component";
import { RegisterComponent } from "./auth/register.component";
import { RegistrationNeededComponent } from "./auth/registration-needed.component";
import { ErrorComponent } from "./error.component";
import { EmailVerificationMissingComponent } from "./auth/email-verification-missing.component";
import { BatchInsertComponent } from "./admin/angels/batch-insert.component";
import { ManageAngelComponent } from "./admin/angels/manage-angel.component";
import { DocumentsComponent } from "./documents/documents.component";
import { AdminDocumentsComponent } from "./admin/documents/admin-documents.component";
import { ManageStartupComponent } from "./admin/startups/manage-startup.component";
import { AdminStartupsComponent } from "./admin/startups/admin-startups.component";
import { StartupsComponent } from "./startups/startups.component";
import { StartupDetailsComponent } from "./startups/startup-details.component";
import { SearchHighlightComponent } from "./angels/search-highlight.component";
import {ManageDocumentComponent} from "./admin/documents/manage-document.component";
import {DocumentsListComponent} from "./documents/documents-list/documents-list.component";
import {DocumentsListRowItemComponent} from "./documents/documents-list/documents-list-row-item.component";
import {DocumentsListFolderComponent} from "./documents/documents-list/documents-list-folder.component";

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
    path: 'startups',
    component: StartupsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'startups/:startupId',
    component: StartupDetailsComponent,
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

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
  CallbackComponent,
  AngelsComponent,
  AngelDetailsComponent,
  DocumentsComponent,
  DocumentsListComponent,
  DocumentsListRowItemComponent,
  DocumentsListFolderComponent,
  StartupsComponent,
  StartupDetailsComponent,
  ProfileComponent,
  AdminComponent,
  ManageAngelComponent,
  AdminAngelListComponent,
  AdminDocumentsComponent,
  ManageDocumentComponent,
  AdminStartupsComponent,
  ManageStartupComponent,
  LandingComponent,
  InviteComponent,
  RegisterComponent,
  RegistrationNeededComponent,
  ErrorComponent,
  EmailVerificationMissingComponent,
  BatchInsertComponent,
  SearchHighlightComponent
];
