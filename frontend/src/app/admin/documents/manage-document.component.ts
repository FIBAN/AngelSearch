import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router, Routes} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DocumentService} from "../../documents/document.service";
import {Document} from "../../documents/document";

@Component({
  selector: 'admin-manage-document',
  template: `
    <h3 class="text-center">{{document?.name}}</h3>

    <div class="row">
      <div class="col">
        <form *ngIf="documentForm" [formGroup]="documentForm">
          <table class="table">
            <tbody>
            <!-- ID -->
            <tr>
              <td>Id</td>
              <td>{{document?.id}}</td>
            </tr>
            
            <!-- Type -->
            <tr>
              <td>Type</td>
              <td>{{document?.type}}</td>
            </tr>

            <!-- Created -->
            <tr>
              <td>Created</td>
              <td>{{document?.created_at | date:'medium'}}</td>
            </tr>

            <!-- Last Updated -->
            <tr>
              <td>Last Updated</td>
              <td>{{document?.updated_at | date:'medium'}}</td>
            </tr>

            <!-- Name -->
            <tr>
              <td>Name</td>
              <td><input class="form-control" formControlName="name"></td>
            </tr>

            <!-- Download URL -->
            <tr>
              <td>Download URL</td>
              <td><input class="form-control" formControlName="download_url"></td>
            </tr>
            </tbody>
          </table>
          <button class="btn btn-success" (click)="saveChanges()">Save Changes</button>
          <a routerLink="/admin/documents" class="btn btn-secondary">Discard Changes</a>
          <button class="btn btn-danger pull-right" (click)="deleteDocument()">Delete Document</button>
        </form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ManageDocumentComponent implements OnInit {

  document: Document;

  documentForm: FormGroup;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.documentService.getDocument(params.get('documentId')))
      .subscribe((document: Document) => {
        this.document = document;

        this.documentForm = this.fb.group({
          'name': document.name,
          'download_url': document.download_url,
          'parent': document.parent
        })
      });
  }

  saveChanges(): void {
    const formData = this.documentForm.getRawValue();
    for(let k in formData) {
      if(formData.hasOwnProperty(k)) {
        this.document[k] = formData[k];
      }
    }
    this.documentService.updateDocument(this.document)
      .then(() => {
        this.router.navigate(['/admin/documents'])
      });
  }

  deleteDocument(): void {
    this.documentService.deleteDocument(this.document.id)
      .then(() =>
        this.router.navigate(['/admin/documents'])
      );
  }

}
