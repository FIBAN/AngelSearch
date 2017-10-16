import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';


import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { AngelService } from './angels/angel.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

import { AdminService } from "./admin/angels/admin.service";
import { AdminAuthGuard } from "./auth/admin-auth-guard.service";
import { DocumentService } from "./documents/document.service";
import { StartupService } from "./startups/startup.service";
import { StartupModule } from "./startups/startup.module";
import {ProfileModule} from "./profile/profile.module";
import {AppRoutingModule} from "./app-routing.module";
import { CallbackComponent } from './auth/callback.component';
import { LandingComponent } from "./landing.component";
import { InviteComponent } from "./auth/invite.component";
import { RegisterComponent } from "./auth/register.component";
import { RegistrationNeededComponent } from "./auth/registration-needed.component";
import { ErrorComponent } from "./error.component";
import { EmailVerificationMissingComponent } from "./auth/email-verification-missing.component";
import {DocumentModule} from "./documents/document.module";
import {AngelModule} from "./angels/angel.module";
import {AdminModule} from "./admin/admin.module";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AuthModule,
    NgbModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    StartupModule,
    ProfileModule,
    DocumentModule,
    AngelModule,
    AdminModule
  ],
  declarations: [
    AppComponent,
    CallbackComponent,
    LandingComponent,
    InviteComponent,
    RegisterComponent,
    RegistrationNeededComponent,
    ErrorComponent,
    EmailVerificationMissingComponent
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
