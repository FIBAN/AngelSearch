import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { AuthModule } from './auth.module';

import { AngelService } from './angel.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

import { SearchFilterPipe } from './search.pipe';
import {KeysPipe} from "./keys.pipe";
import {AdminService} from "./admin.service";
import {AngelInfoComponent} from "./angel-info.component";

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
