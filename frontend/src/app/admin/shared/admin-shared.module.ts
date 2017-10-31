import { NgModule }           from '@angular/core';
import {BackButtonComponent} from "./back-button.component";
import {SharedModule} from "../../shared/shared.module";
import {DataTableComponent} from "./data-table.component";
import {ConfirmModalComponent} from "./confirm-modal.component";

@NgModule({
  imports:      [ SharedModule ],
  declarations: [ BackButtonComponent, DataTableComponent, ConfirmModalComponent ],
  exports:      [
    SharedModule,
    BackButtonComponent,
    DataTableComponent,
    ConfirmModalComponent
  ]
})
export class AdminSharedModule { }
