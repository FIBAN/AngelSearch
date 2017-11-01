import { NgModule } from '@angular/core';
import {AngelRoutingModule} from './angel-routing.module';
import {AngelsComponent} from './angels.component';
import {AngelDetailsComponent} from './angel-details.component';
import {AngelFilterControlsComponent} from './angel-filter-controls.component';
import {AngelInfoComponent} from './angel-info.component';
import {SearchHighlightComponent} from './search-highlight.component';
import {KeysPipe} from './keys.pipe';
import {AngelFilterPipe} from './angel-filter.pipe';
import {AngelService} from './angel.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports:      [ SharedModule, AngelRoutingModule ],
  declarations: [ AngelFilterPipe, AngelsComponent, AngelDetailsComponent, AngelFilterControlsComponent, AngelInfoComponent,
    SearchHighlightComponent, KeysPipe ],
  providers:    [ AngelService ]
})
export class AngelModule { }
