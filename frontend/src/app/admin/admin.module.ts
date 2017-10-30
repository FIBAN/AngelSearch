import { NgModule }           from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminDocumentsComponent} from "./documents/documents.component";
import {ManageDocumentComponent} from "./documents/manage-document.component";
import {StartupsComponent} from "./startups/startups.component";
import {ManageStartupComponent} from "./startups/manage-startup.component";
import {AdminComponent} from "./admin.component";
import {AdminSharedModule} from "./shared/admin-shared.module";
import {StartupListComponent} from "./startups/startup-list.component";
import {AddStartupComponent} from "./startups/add-startup.component";

@NgModule({
  imports:      [ AdminSharedModule, AdminRoutingModule ],
  declarations: [
    AdminComponent,
    AdminDocumentsComponent,
    ManageDocumentComponent,
    StartupsComponent,
    StartupListComponent,
    AddStartupComponent,
    ManageStartupComponent
  ]
})
export class AdminModule { }
