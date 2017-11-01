import {Component, Input, OnChanges} from '@angular/core';
import {Document} from '../document';

@Component({
  selector: 'document-list',
  template: `
    <ul class="list-unstyled">
      <li *ngFor="let document of rootDocuments; let i = index">
        <document-list-folder *ngIf="document.type === 'folder'" [documents]="documents" [folder]="document"
                              [last]="i === rootDocuments.length - 1"></document-list-folder>
        <document-list-row-item *ngIf="document.type === 'file'" [document]="document"
                                [last]="i === rootDocuments.length - 1"></document-list-row-item>
      </li>
    </ul>
  `,
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnChanges {

  @Input() documents: Document[];
  rootDocuments: Document[];

  constructor() {}

  ngOnChanges() {
    if (this.documents) {
      this.rootDocuments = this.documents.filter(d => d.parent === null).sort(Document.compareTypeAndName);
    }
  }

}
