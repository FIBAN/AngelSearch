import { NgModule }           from '@angular/core';
import {CommonModule} from "@angular/common";
import {DocumentsComponent} from "./documents.component";
import {DocumentRoutingModule} from "./document-routing.module";
import {DocumentService} from "./document.service";
import {DocumentsListComponent} from "./documents-list/documents-list.component";
import {DocumentsListFolderComponent} from "./documents-list/documents-list-folder.component";
import {DocumentsListRowItemComponent} from "./documents-list/documents-list-row-item.component";
import {ChildOfPipe} from "./child-of.pipe";

@NgModule({
  imports:      [ CommonModule, DocumentRoutingModule ],
  declarations: [ DocumentsComponent, DocumentsListComponent, DocumentsListFolderComponent, DocumentsListRowItemComponent, ChildOfPipe ],
  providers:    [ DocumentService ],
  exports:      [ ChildOfPipe ]
})
export class DocumentModule { }
