import { NgModule }           from '@angular/core';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./angels/admin.component";
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

@NgModule({
  imports:      [ SharedModule, AdminRoutingModule ],
  declarations: [ AdminComponent, AdminAngelListComponent, BatchInsertComponent, ManageAngelComponent, NewAngelFormComponent,
  AdminDocumentsComponent, ManageDocumentComponent, AdminStartupsComponent, ManageStartupComponent ],
  providers:    [ AdminService ]
})
export class AdminModule { }
