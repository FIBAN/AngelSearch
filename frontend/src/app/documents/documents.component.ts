import {Component, OnInit} from '@angular/core';
import {DocumentService} from "./document.service";
import {Document} from "./document";

@Component({
  selector: 'documents',
  templateUrl: 'documents.component.html',
  styleUrls: ['documents.component.css']
})
export class DocumentsComponent implements OnInit {

  documents: Document[];

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.documentService.getDocuments().then((documents) => {
      //TODO: Display folders to user
      this.documents = documents.filter(d => d.type == 'file');
    })
  }

}
