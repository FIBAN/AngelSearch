import { NgModule }           from '@angular/core';
import {BackButtonComponent} from "./back-button.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports:      [ SharedModule ],
  declarations: [ BackButtonComponent ],
  exports:      [
    SharedModule,
    BackButtonComponent
  ]
})
export class AdminSharedModule { }
