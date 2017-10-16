import { NgModule }           from '@angular/core';
import {CommonModule} from "@angular/common";
import {StartupRoutingModule} from "./startup-routing.module";
import {StartupsComponent} from "./startups.component";
import {StartupDetailsComponent} from "./startup-details.component";
import {StartupService} from "./startup.service";

@NgModule({
  imports:      [ CommonModule, StartupRoutingModule ],
  declarations: [ StartupsComponent, StartupDetailsComponent ],
  providers:    [ StartupService ]
})
export class StartupModule { }
