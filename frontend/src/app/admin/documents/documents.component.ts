import { Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {Document} from "../../documents/document";
import {DocumentService} from "../../documents/document.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  template: `
    <div class="row">
      <div class="col">
        <h4>Documents</h4>
      </div>
      <div class="col text-right">
        <a *ngIf="currentFolderId" routerLink="add" [queryParams]="{parent: currentFolderId}" class="btn btn-primary mb-2">Add Document</a>
        <a *ngIf="!currentFolderId" routerLink="add" class="btn btn-primary mb-2">Add Document</a>
      </div>
    </div>
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
        <admin-document-list [documents]="documents" [currentFolderId]="currentFolderId"></admin-document-list>
      </div>
    </div>
  `,
  styles: [
    '.ng-valid[required], .ng-valid.required { border-left: 5px solid #42A948; /* green */}',
    '.ng-invalid:not(form) { border-left: 5px solid #a94442; /* red */}',
    '#document-breadcrumb-container .document-breadcrumb:not(:first-child)::before { content: " / ";}'
  ]
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];

  currentPath: Document[] = [];
  currentFolderId: string | null = null;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.documentService.getDocuments().then((documents) => {
      this.documents = documents;
      this.updatePath();
    });

    this.route.queryParamMap
      .switchMap((params: ParamMap) => Observable.of(params.get('parent')))
      .subscribe((folderId) => {
        this.currentFolderId = folderId;
        this.updatePath();
      })
  }

  private updatePath(): void {
    const newPath = [];
    if (this.currentFolderId && this.documents && this.documents.length > 0) {
      let currentDocument = this.documents.find(d => d.id === this.currentFolderId);
      while (currentDocument && newPath.indexOf(currentDocument) === -1) {
        newPath.unshift(currentDocument);
        currentDocument = this.documents.find(d => d.id === currentDocument.parent);
      }
    }
    this.currentPath = newPath;
  }

  openFolder(folder: Document | null) {
    if (folder && folder.type === 'folder') {
      this.router.navigate(['.'], {queryParams: {parent: folder && folder.id}, relativeTo: this.route});
    } else {
      this.router.navigate(['.'], {relativeTo: this.route});
    }
  }

}
