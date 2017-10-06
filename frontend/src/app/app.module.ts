import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';


import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
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
import {ChildOfPipe} from "./documents/child-of.pipe";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,
    AuthModule,
    NgbModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
  ],
  declarations: [
    AppComponent,
    routedComponents,
    AngelInfoComponent,
    NewAngelFormComponent,
    AngelFilterControlsComponent,
    AngelFilterPipe,
    AngelSorterPipe,
    ChildOfPipe,
    KeysPipe
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
