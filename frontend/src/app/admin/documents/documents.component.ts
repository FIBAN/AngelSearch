import { Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {Document} from "../../documents/document";
import {DocumentService} from "../../documents/document.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  template: `
    <h4>Documents</h4>
    <div class="row" *ngIf="currentPath.length">
      <div class="col">
        <div id="document-breadcrumb-container">
          <span class="document-breadcrumb">
            <a href="#" (click)="openFolder(null); false">Root</a>
          </span>
          <span class="document-breadcrumb" *ngFor="let folder of currentPath">
            <a  class="document-breadcrumb" href="#" (click)="openFolder(folder); false">{{folder.name}}</a>
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table table-sm">
          <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Type</th>
          <th>Created At</th>
          <th></th>
          </thead>
          <tbody>
          <tr *ngFor="let document of documents|childOfDocument:currentFolderId">
            <!-- Id -->
            <td><span class="monospace small">{{document.id}}</span></td>

            <!-- Name -->
            <td *ngIf="document.type === 'folder'"><a href="#" (click)="openFolder(document); false">{{document.name}}</a></td>
            <td *ngIf="document.type !== 'folder'">{{document.name}}</td>

            <!-- Type -->
            <td>{{document.type}}</td>

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
            <label for="type">Type</label>
            <select type="text" class="form-control" id="type" formControlName="type" (change)="newDocumentTypeChanged($event)">
              <option value="file">File</option>
              <option value="folder">Folder</option>
            </select>
          </div>

          <div class="form-group">
            <label for="download_url">Download URL</label>
            <input type="text" class="form-control" id="download_url" formControlName="download_url">
          </div>
        </form>
        <button class="btn btn-success" (click)="saveNewDocument()">Save New Document</button>
      </div>
    </div>
  `,
  styles: [
    '.ng-valid[required], .ng-valid.required { border-left: 5px solid #42A948; /* green */}',
    '.ng-invalid:not(form) { border-left: 5px solid #a94442; /* red */}',
    '#document-breadcrumb-container .document-breadcrumb:not(:first-child)::before { content: " / ";}'
  ]
})
export class AdminDocumentsComponent implements OnInit {
  documents: Document[] = [];

  newDocumentForm: FormGroup;

  currentPath: Document[] = [];
  currentFolderId: string|null = null;

  constructor(
    private documentService: DocumentService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.documentService.getDocuments().then((documents) => this.documents = documents);

    this.newDocumentForm = this.fb.group({
      name: "",
      download_url: "",
      type: "file"
    });
  }

  openFolder(folder: Document|null) {
    if(folder && folder.type === 'folder') {
      const folderIndexInPath = this.currentPath.map(f => f.id).indexOf(folder.id);
      if(folderIndexInPath === -1) {
        this.currentPath.push(folder);
        this.currentFolderId = folder.id;
      }
      else {
        this.currentPath = this.currentPath.slice(0, folderIndexInPath + 1);
        this.currentFolderId = folder.id;
      }
    } else {
      this.currentPath = [];
      this.currentFolderId = null;
    }
  }

  newDocumentTypeChanged(event) {
    console.log('change event', event);
    const downloadUrlInput = this.newDocumentForm.get('download_url');
    if(event.target.value === 'folder') {
      downloadUrlInput.setValue("");
      downloadUrlInput.disable();
    }
    else {
      downloadUrlInput.enable();
    }
  }

  saveNewDocument(): void {
    const formData = this.newDocumentForm.getRawValue();
    formData.parent = this.currentFolderId;
    if(formData.type === 'folder') {
      formData.download_url = undefined;
    }
    this.documentService.createDocument(formData).then(() => this.ngOnInit());
  }

  deleteDocument(documentId): void {
    this.documentService.deleteDocument(documentId).then(() => this.ngOnInit());
  }

}
