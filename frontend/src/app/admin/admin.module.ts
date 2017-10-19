import { NgModule }           from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminDocumentsComponent} from "./documents/admin-documents.component";
import {ManageDocumentComponent} from "./documents/manage-document.component";
import {AdminStartupsComponent} from "./startups/admin-startups.component";
import {ManageStartupComponent} from "./startups/manage-startup.component";
import {SharedModule} from "../shared/shared.module";
import {AdminComponent} from "./admin.component";

@NgModule({
  imports:      [ SharedModule, AdminRoutingModule ],
  declarations: [
    AdminComponent,
    AdminDocumentsComponent,
    ManageDocumentComponent,
    AdminStartupsComponent,
    ManageStartupComponent
  ]
})
export class AdminModule { }
