import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import * as Raven from 'raven-js';
import { environment } from '../environments/environment'

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { AngelService } from './angels/angel.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

import { AngelAdminService } from './admin/angels/angel-admin.service';
import { AdminAuthGuard } from './auth/admin-auth-guard.service';
import { DocumentService } from './documents/document.service';
import { StartupService } from './startups/startup.service';
import { StartupModule } from './startups/startup.module';
import { ProfileModule } from './profile/profile.module';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing.component';
import { ErrorComponent } from './error.component';
import {DocumentModule} from './documents/document.module';
import {AngelModule} from './angels/angel.module';
import {SharedModule} from './shared/shared.module';

Raven
  .config('https://6b88f4df828249129e1a24eca585a7bb@sentry.io/244816', {
    environment: (environment.production ? 'production' : 'development'),
    whitelistUrls: [
      /https?:\/\/business-angel-search\.herokuapp\.com/
    ]
  })
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    NgbModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    SharedModule,
    StartupModule,
    ProfileModule,
    DocumentModule,
    AngelModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    ErrorComponent,
  ],
  providers: [
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    AngelService,
    AuthService,
    AngelAdminService,
    DocumentService,
    StartupService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
