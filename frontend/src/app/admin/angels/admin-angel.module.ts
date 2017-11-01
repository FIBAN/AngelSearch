import { NgModule } from '@angular/core';
import {AngelsComponent} from './angels.component';
import {AngelListComponent} from './angel-list.component';
import {AddAngelComponent} from './add-angel.component';
import {AddMultipleAngelsComponent} from './add-multiple-angels.component';
import {ManageAngelComponent} from './manage-angel.component';
import {NewAngelFormComponent} from 'app/admin/angels/new-angel-form.component';
import {AngelAdminService} from './angel-admin.service';
import {AdminAngelRoutingModule} from './admin-angel-routing.module';
import {AdminSharedModule} from '../shared/admin-shared.module';

@NgModule({
  imports:      [ AdminSharedModule, AdminAngelRoutingModule ],
  declarations: [
    AngelsComponent,
    AngelListComponent,
    AddAngelComponent,
    AddMultipleAngelsComponent,
    ManageAngelComponent,
    NewAngelFormComponent
  ],
  providers:    [ AngelAdminService ]
})
export class AdminAngelModule { }
