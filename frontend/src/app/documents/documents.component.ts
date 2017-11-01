import {Component, OnInit} from '@angular/core';
import {DocumentService} from './document.service';
import {Document} from './document';

@Component({
  templateUrl: 'documents.component.html'
})
export class DocumentsComponent implements OnInit {

  documents: Document[];

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.documentService.getDocuments().then((documents) => {
      this.documents = documents;
    })
  }

}
