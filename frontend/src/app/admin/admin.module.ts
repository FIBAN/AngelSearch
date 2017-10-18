import { NgModule }           from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminAngelsComponent} from "./angels/admin-angels.component";
import {AdminAngelListComponent} from "./angels/admin-angel-list.component";
import {BatchInsertComponent} from "./angels/batch-insert.component";
import {ManageAngelComponent} from "./angels/manage-angel.component";
import {NewAngelFormComponent} from "./angels/new-angel-form.component";
import {AdminDocumentsComponent} from "./documents/admin-documents.component";
import {ManageDocumentComponent} from "./documents/manage-document.component";
import {AdminStartupsComponent} from "./startups/admin-startups.component";
import {ManageStartupComponent} from "./startups/manage-startup.component";
import {AdminService} from "./angels/admin.service";
import {SharedModule} from "../shared/shared.module";
import {AdminComponent} from "./admin.component";

@NgModule({
  imports:      [ SharedModule, AdminRoutingModule ],
  declarations: [ AdminComponent, AdminAngelsComponent, AdminAngelListComponent, BatchInsertComponent, ManageAngelComponent, NewAngelFormComponent,
  AdminDocumentsComponent, ManageDocumentComponent, AdminStartupsComponent, ManageStartupComponent ],
  providers:    [ AdminService ]
})
export class AdminModule { }
