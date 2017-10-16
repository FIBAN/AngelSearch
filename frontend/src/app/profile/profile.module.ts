import { NgModule }           from '@angular/core';
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports:      [ SharedModule, ProfileRoutingModule ],
  declarations: [ ProfileComponent ]
})
export class ProfileModule { }
