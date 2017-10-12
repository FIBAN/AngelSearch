import {Component, Input, OnChanges} from '@angular/core';
import {Document} from "../document";

@Component({
  selector: 'documents-list-folder',
  template: `    
    <div class="document-row row" [class.last]="last">
      <div class="col-12">
        <div class="folder-row row">
          <div class=" col-1">
            <i *ngIf="!expanded" class="fa fa-folder-o document-icon" aria-hidden="true"></i>
            <i *ngIf="expanded" class="fa fa-folder-open-o document-icon" aria-hidden="true"></i>
          </div>
          <div class="document-name col">
            <span class="d-none d-md-block">{{folder.name}}</span>
            <a class="d-block d-md-none" href="#" (click)="toggleFolder(); false">{{folder.name}}</a>
          </div>
          <div class="document-link-desktop col-2 d-none d-md-block">
            <a href="#" (click)="toggleFolder(); false" class="btn btn-primary">View</a>
          </div>
        </div>
        <div class="row" *ngIf="expanded">
          <div class="col pl-5">
            <ul class="list-unstyled">
              <li *ngFor="let document of childDocuments; let i = index">
                  <documents-list-folder *ngIf="document.type === 'folder'" [documents]="documents" [folder]="document" [last]="i === childDocuments.length - 1"></documents-list-folder>
                  <documents-list-row-item *ngIf="document.type === 'file'" [document]="document" [last]="i === childDocuments.length - 1"></documents-list-row-item>
              </li>
              <li *ngIf="childDocuments.length == 0">
                <div class="document-row row last">
                  <div class="col">This folder is empty.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListFolderComponent implements OnChanges {

  @Input() folder: Document;
  @Input() documents: Document[];
  @Input() last: boolean;

  expanded = false;
  childDocuments: Document[];

  constructor(){}

  ngOnChanges() {
    if(this.folder.id && this.documents) {
      this.childDocuments = this.documents
        .filter(d => d.parent === this.folder.id)
        .sort(Document.compareTypeAndName);
    }
  }

  toggleFolder() {
    this.expanded = !this.expanded;
  }

}
