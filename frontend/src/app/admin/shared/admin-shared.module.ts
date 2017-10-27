import { NgModule }           from '@angular/core';
import {BackButtonComponent} from "./back-button.component";
import {SharedModule} from "../../shared/shared.module";
import {DataTableComponent} from "./data-table.component";

@NgModule({
  imports:      [ SharedModule ],
  declarations: [ BackButtonComponent, DataTableComponent ],
  exports:      [
    SharedModule,
    BackButtonComponent,
    DataTableComponent
  ]
})
export class AdminSharedModule { }
