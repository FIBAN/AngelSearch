import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { AuthModule } from './auth/auth.module';

import { AngelService } from './angels/angel.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

import { SearchFilterPipe } from './angels/search.pipe';
import {KeysPipe} from "./angels/keys.pipe";
import {AdminService} from "./admin/admin.service";
import {AngelInfoComponent} from "./angels/angel-info.component";
import {NewAngelFormComponent} from "./admin/new-angel-form.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    AuthModule,
    NgxDatatableModule
  ],
  declarations: [
    AppComponent,
    routedComponents,
    AngelInfoComponent,
    NewAngelFormComponent,
    SearchFilterPipe,
    KeysPipe
  ],
  providers: [
    AngelService,
    AuthService,
    AdminService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
