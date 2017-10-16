import { NgModule }           from '@angular/core';
import {DocumentsComponent} from "./documents.component";
import {DocumentRoutingModule} from "./document-routing.module";
import {DocumentService} from "./document.service";
import {DocumentsListComponent} from "./documents-list/documents-list.component";
import {DocumentsListFolderComponent} from "./documents-list/documents-list-folder.component";
import {DocumentsListRowItemComponent} from "./documents-list/documents-list-row-item.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports:      [ SharedModule, DocumentRoutingModule ],
  declarations: [ DocumentsComponent, DocumentsListComponent, DocumentsListFolderComponent, DocumentsListRowItemComponent ],
  providers:    [ DocumentService ]
})
export class DocumentModule { }
