import { NgModule }           from '@angular/core';
import {CommonModule} from "@angular/common";
import {AngelRoutingModule} from "./angel-routing.module";
import {AngelsComponent} from "./angels.component";
import {AngelDetailsComponent} from "./angel-details.component";
import {AngelFilterControlsComponent} from "./angel-filter-controls.component";
import {AngelInfoComponent} from "./angel-info.component";
import {SearchHighlightComponent} from "./search-highlight.component";
import {KeysPipe} from "./keys.pipe";
import {AngelFilterPipe} from "./angel-filter.pipe";
import {AngelSorterPipe} from "./angel-sorter.pipe";
import {AngelService} from "./angel.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports:      [ CommonModule, AngelRoutingModule, ReactiveFormsModule ],
  declarations: [ AngelSorterPipe, AngelFilterPipe, AngelsComponent, AngelDetailsComponent, AngelFilterControlsComponent, AngelInfoComponent,
    SearchHighlightComponent, KeysPipe ],
  providers:    [ AngelService ],
  exports:      [ AngelFilterPipe, AngelSorterPipe ]
})
export class AngelModule { }
