import { Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {Document} from "../../documents/document";
import {DocumentService} from "../../documents/document.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'admin',
  template: `
    <h3 class="text-center">Admin tools</h3>

    <h4>Documents</h4>
    <div class="row">
      <div class="col">
        <table class="table table-sm">
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>Download URL</th>
            <th>Created At</th>
            <th></th>
          </thead>
          <tbody>
            <tr *ngFor="let document of documents|childOfDocument">
              <!-- Id -->
              <td><span class="monospace small">{{document.id}}</span></td>
    
              <!-- Name -->
              <td><a [routerLink]="['/admin/documents', document.id]">{{document.name}}</a></td>
    
              <!-- Download URL-->
              <td>{{document.download_url}}</td>
    
              <!-- Created At-->
              <td>{{document.created_at | date:'medium'}}</td>
              
              <!-- Actions -->
              <td><a [routerLink]="['/admin/documents', document.id]" class="btn btn-info">Edit</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-8">
        <h4>New Document</h4>
        <form [formGroup]="newDocumentForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" required formControlName="name">
          </div>
    
          <div class="form-group">
            <label for="download_url">Download URL</label>
            <input type="text" class="form-control" id="download_url" required formControlName="download_url">
          </div>
        </form>
        <button class="btn btn-success" (click)="saveNewDocument()">Save New Document</button>
      </div>
    </div>
  `,
  styles: [
    '.ng-valid[required], .ng-valid.required { border-left: 5px solid #42A948; /* green */}',
    '.ng-invalid:not(form) { border-left: 5px solid #a94442; /* red */}'
  ]
})
export class AdminDocumentsComponent implements OnInit {
  documents: Document[];

  newDocumentForm: FormGroup;

  constructor(
    private documentService: DocumentService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.documentService.getDocuments().then((documents) => this.documents = documents);

    this.newDocumentForm = this.fb.group({
      name: "",
      download_url: ""
    });
  }

  saveNewDocument(): void {
    const formData = this.newDocumentForm.getRawValue();
    formData.type = 'file';
    this.documentService.createDocument(formData).then(() => this.ngOnInit());
  }

  deleteDocument(documentId): void {
    this.documentService.deleteDocument(documentId).then(() => this.ngOnInit());
  }

}
