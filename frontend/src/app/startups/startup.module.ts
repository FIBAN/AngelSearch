import { NgModule } from '@angular/core';
import {StartupRoutingModule} from './startup-routing.module';
import {StartupsComponent} from './startups.component';
import {StartupDetailsComponent} from './startup-details.component';
import {StartupService} from './startup.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports:      [ SharedModule, StartupRoutingModule ],
  declarations: [ StartupsComponent, StartupDetailsComponent ],
  providers:    [ StartupService ]
})
export class StartupModule { }
