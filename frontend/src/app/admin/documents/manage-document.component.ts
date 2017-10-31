import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router, Routes} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DocumentService} from "../../documents/document.service";
import {Document} from "../../documents/document";

type FolderChoice = {id: string, path: string};

@Component({
  templateUrl: 'manage-document.component.html',
  styles: [
  ]
})
export class ManageDocumentComponent implements OnInit {

  document: Document;

  documentForm: FormGroup;

  folderChoices: FolderChoice[];

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

        this.documentService.getFolders().then(folders => {
          if(document.type === 'folder') {
            this.updateFolderChoices(folders, document.id);
          } else {
            this.updateFolderChoices(folders, null);
          }
        });

        this.documentForm = this.fb.group({
          'name': document.name,
          'download_url': document.download_url,
          'parent': document.parent || ""
        });
      });


  }

  updateFolderChoices(folders: Document[], ignoreFolderId: string|null) {
    const choices = folders
      .filter(f => f.parent === null)
      .filter(f => !this.ignoreIdMatchesFolder(ignoreFolderId, f))
      .map(f => ({id: f.id, path: f.name}));

    for (const choice of choices) {
      Array.prototype.push.apply(choices, this.getSubChoicesOfParentChoice(choice, folders, ignoreFolderId));
    }

    this.folderChoices = choices;
  }

  getSubChoicesOfParentChoice(parentChoice: FolderChoice, folders: Document[], ignoreFolderId: string|null): FolderChoice[] {
      const choices = folders
        .filter(f => f.parent === parentChoice.id)
        .filter(f => !this.ignoreIdMatchesFolder(ignoreFolderId, f))
        .map(f => ({id: f.id, path: `${parentChoice.path} / ${f.name}`}));

      for (const choice of choices) {
        Array.prototype.push.apply(choices, this.getSubChoicesOfParentChoice(choice, folders, ignoreFolderId));
      }

      return choices;
  }

  ignoreIdMatchesFolder(ignoreId: string|null, folder: Document): boolean {
      return ignoreId && folder.id === ignoreId;
  }

  saveChanges(): void {
    const formData = this.documentForm.getRawValue();
    for(let k in formData) {
      if(formData.hasOwnProperty(k)) {
        this.document[k] = formData[k];
      }
    }
    this.documentService.updateDocument(this.document)
      .then(() => this.navigateBack());
  }

  deleteDocument(): void {
    this.documentService.deleteDocument(this.document.id)
      .then(() => this.navigateBack());
  }

  private navigateBack(): void {
    const navigationExtras = {};
    if(this.document.parent) navigationExtras['queryParams'] = {parent: this.document.parent};
    this.router.navigate(['/admin/documents'], navigationExtras)
  }

}
