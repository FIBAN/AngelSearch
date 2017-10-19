import { NgModule }           from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {AdminAngelsComponent} from "./admin-angels.component";
import {AdminAngelListComponent} from "./admin-angel-list.component";
import {AddAngelComponent} from "./add-angel.component";
import {AddMultipleAngelsComponent} from "./add-multiple-angels.component";
import {ManageAngelComponent} from "./manage-angel.component";
import {NewAngelFormComponent} from "app/admin/angels/new-angel-form.component";
import {AngelAdminService} from "./angel-admin.service";
import {AdminAngelRoutingModule} from "./admin-angel-routing.module";


@NgModule({
  imports:      [ SharedModule, AdminAngelRoutingModule ],
  declarations: [
    AdminAngelsComponent,
    AdminAngelListComponent,
    AddAngelComponent,
    AddMultipleAngelsComponent,
    ManageAngelComponent,
    NewAngelFormComponent
  ],
  providers:    [ AngelAdminService ]
})
export class AdminAngelModule { }
