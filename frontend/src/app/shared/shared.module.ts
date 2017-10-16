import { NgModule }           from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChildOfPipe} from "./child-of.pipe";
import {AngelSorterPipe} from "./angel-sorter.pipe";

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ChildOfPipe, AngelSorterPipe ],
  exports:      [ ChildOfPipe, AngelSorterPipe, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class SharedModule { }
