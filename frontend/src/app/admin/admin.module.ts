import { NgModule }           from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminDocumentsComponent} from "./documents/documents.component";
import {ManageDocumentComponent} from "./documents/manage-document.component";
import {AdminStartupsComponent} from "./startups/startups.component";
import {ManageStartupComponent} from "./startups/manage-startup.component";
import {AdminComponent} from "./admin.component";
import {AdminSharedModule} from "./shared/admin-shared.module";

@NgModule({
  imports:      [ AdminSharedModule, AdminRoutingModule ],
  declarations: [
    AdminComponent,
    AdminDocumentsComponent,
    ManageDocumentComponent,
    AdminStartupsComponent,
    ManageStartupComponent
  ]
})
export class AdminModule { }
