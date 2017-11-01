import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DocumentService} from '../../documents/document.service';
import {Document} from '../../documents/document';
import {Observable} from 'rxjs/Observable';

@Component({
  templateUrl: 'add-document.component.html',
  styles: [
    '.ng-valid[required], .ng-valid.required { border-left: 5px solid #42A948; /* green */}',
    '.ng-invalid:not(form) { border-left: 5px solid #a94442; /* red */}'
  ]
})
export class AddDocumentComponent implements OnInit {
  documentForm: FormGroup;

  currentFolderId: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

      this.documentForm = this.fb.group({
        name: '',
        download_url: '',
        type: 'file'
      });

      this.route.queryParamMap
        .switchMap((params: ParamMap) => Observable.of(params.get('parent')))
        .subscribe((folderId) => {
          this.currentFolderId = folderId;
        });
  }

  documentTypeChanged(event) {
    console.log('change event', event);
    const downloadUrlInput = this.documentForm.get('download_url');
    if (event.target.value === 'folder') {
      downloadUrlInput.setValue('');
      downloadUrlInput.disable();
    }
    else {
      downloadUrlInput.enable();
    }
  }

  submit(): void {
    this.documentService.createDocument(this.documentFromForm())
      .then(() => this.router.navigate(['..'], {queryParams: {parent: this.currentFolderId}, relativeTo: this.route}));
  }

  private documentFromForm(): Document {
    const rawDocument = this.documentForm.getRawValue();
    if (this.currentFolderId) {
      rawDocument.parent = this.currentFolderId;
    }
    if (rawDocument.type === 'folder') {
      rawDocument.download_url = undefined;
    }
    return rawDocument as Document;
  }

}
