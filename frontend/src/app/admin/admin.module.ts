import { NgModule }           from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {DocumentsComponent} from "./documents/documents.component";
import {ManageDocumentComponent} from "./documents/manage-document.component";
import {StartupsComponent} from "./startups/startups.component";
import {ManageStartupComponent} from "./startups/manage-startup.component";
import {AdminComponent} from "./admin.component";
import {AdminSharedModule} from "./shared/admin-shared.module";
import {StartupListComponent} from "./startups/startup-list.component";
import {AddStartupComponent} from "./startups/add-startup.component";
import {AddDocumentComponent} from "./documents/add-document.component";
import {DocumentListComponent} from "./documents/document-list.component";

@NgModule({
  imports:      [ AdminSharedModule, AdminRoutingModule ],
  declarations: [
    AdminComponent,
    DocumentsComponent,
    DocumentListComponent,
    ManageDocumentComponent,
    AddDocumentComponent,
    StartupsComponent,
    StartupListComponent,
    AddStartupComponent,
    ManageStartupComponent
  ]
})
export class AdminModule { }
