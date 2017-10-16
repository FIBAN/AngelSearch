import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';


import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { AngelService } from './angels/angel.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

import { AdminService } from "./admin/angels/admin.service";
import { NewAngelFormComponent } from "./admin/angels/new-angel-form.component";
import { AdminAuthGuard } from "./auth/admin-auth-guard.service";
import { DocumentService } from "./documents/document.service";
import { StartupService } from "./startups/startup.service";
import { StartupModule } from "./startups/startup.module";
import {ProfileModule} from "./profile/profile.module";
import {AppRoutingModule} from "./app-routing.module";
import { CallbackComponent } from './auth/callback.component';
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
import { AdminDocumentsComponent } from "./admin/documents/admin-documents.component";
import { ManageStartupComponent } from "./admin/startups/manage-startup.component";
import { AdminStartupsComponent } from "./admin/startups/admin-startups.component";
import {ManageDocumentComponent} from "./admin/documents/manage-document.component";
import {DocumentModule} from "./documents/document.module";
import {ChildOfPipe} from "./documents/child-of.pipe";
import {AngelModule} from "./angels/angel.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    AuthModule,
    NgbModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    StartupModule,
    ProfileModule,
    DocumentModule,
    AngelModule
  ],
  declarations: [
    AppComponent,
    NewAngelFormComponent,
    ChildOfPipe,
    CallbackComponent,
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
    BatchInsertComponent
  ],
  providers: [
    AngelService,
    AuthService,
    AdminService,
    DocumentService,
    StartupService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
