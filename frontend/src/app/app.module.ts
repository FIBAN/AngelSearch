import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { AuthModule } from './auth/auth.module';

import { AngelService } from './angels/angel.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

import { AngelFilterPipe } from './angels/angel-filter.pipe';
import { AngelSorterPipe } from './angels/angel-sorter.pipe';
import { KeysPipe } from "./angels/keys.pipe";
import { AdminService } from "./admin/admin.service";
import { AngelInfoComponent } from "./angels/angel-info.component";
import { NewAngelFormComponent } from "./admin/new-angel-form.component";
import { AngelFilterControlsComponent } from "./angels/angel-filter-controls.component";
import { AdminAuthGuard } from "./auth/admin-auth-guard.service";
import {DocumentService} from "./documents/document.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,
    AuthModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    routedComponents,
    AngelInfoComponent,
    NewAngelFormComponent,
    AngelFilterControlsComponent,
    AngelFilterPipe,
    AngelSorterPipe,
    KeysPipe
  ],
  providers: [
    AngelService,
    AuthService,
    AdminService,
    DocumentService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
