import { NgModule }           from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChildOfPipe} from "./child-of.pipe";
import {AngelSorterPipe} from "./angel-sorter.pipe";
import {EditableIndustryListComponent} from "./editable-industry-list.component";

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ChildOfPipe, AngelSorterPipe, EditableIndustryListComponent ],
  exports:      [
    ChildOfPipe,
    AngelSorterPipe,
    EditableIndustryListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
