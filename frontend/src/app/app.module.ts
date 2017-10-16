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

import { AngelFilterPipe } from './angels/angel-filter.pipe';
import { AngelSorterPipe } from './angels/angel-sorter.pipe';
import { KeysPipe } from "./angels/keys.pipe";
import { AdminService } from "./admin/angels/admin.service";
import { AngelInfoComponent } from "./angels/angel-info.component";
import { NewAngelFormComponent } from "./admin/angels/new-angel-form.component";
import { AngelFilterControlsComponent } from "./angels/angel-filter-controls.component";
import { AdminAuthGuard } from "./auth/admin-auth-guard.service";
import { DocumentService } from "./documents/document.service";
import { StartupService } from "./startups/startup.service";
import { ChildOfPipe } from "./documents/child-of.pipe";
import { StartupModule } from "./startups/startup.module";
import {ProfileModule} from "./profile/profile.module";
import {AppRoutingModule} from "./app-routing.module";
import { CallbackComponent } from './auth/callback.component';
import { AngelsComponent } from './angels/angels.component';
import { AngelDetailsComponent } from "./angels/angel-details.component";
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
import { SearchHighlightComponent } from "./angels/search-highlight.component";
import {ManageDocumentComponent} from "./admin/documents/manage-document.component";
import {DocumentsListComponent} from "./documents/documents-list/documents-list.component";
import {DocumentsListRowItemComponent} from "./documents/documents-list/documents-list-row-item.component";
import {DocumentsListFolderComponent} from "./documents/documents-list/documents-list-folder.component";

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
    ProfileModule
  ],
  declarations: [
    AppComponent,
    AngelInfoComponent,
    NewAngelFormComponent,
    AngelFilterControlsComponent,
    AngelFilterPipe,
    AngelSorterPipe,
    ChildOfPipe,
    KeysPipe,
    CallbackComponent,
    AngelsComponent,
    AngelDetailsComponent,
    DocumentsComponent,
    DocumentsListComponent,
    DocumentsListRowItemComponent,
    DocumentsListFolderComponent,
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
