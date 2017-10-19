import { NgModule }           from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChildOfPipe} from "./child-of.pipe";
import {AngelSorterPipe} from "./angel-sorter.pipe";
import {RichTableComponent} from "./rich-table.component";

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ChildOfPipe, AngelSorterPipe, RichTableComponent ],
  exports:      [
    ChildOfPipe,
    AngelSorterPipe,
    RichTableComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
