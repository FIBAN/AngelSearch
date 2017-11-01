import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment} from '../../environments/environment'

import 'rxjs/add/operator/toPromise';

import { Document } from './document';

@Injectable()
export class DocumentService {
  // Define the routes we are going to interact with
  private documentsUrl = environment.backend + '/documents';
  private documentDetailsUrl(documentId: string) { return this.documentsUrl + '/' + documentId; }

  constructor(private authHttp: AuthHttp) { }

  getDocuments() {
    return this.authHttp
      .get(this.documentsUrl)
      .toPromise()
      .then(response => response.json() as Document[])
      .catch(this.handleError);
  }

  getFolders() {
    return this.getDocuments()
      .then(allDocuments => allDocuments.filter(d => d.type === 'folder'))
  }

  getDocument(documentId: string) {
    return this.authHttp
      .get(this.documentDetailsUrl(documentId))
      .toPromise()
      .then(response => response.json() as Document)
      .catch(this.handleError);
  }

  updateDocument(document: Document) {
    return this.authHttp
      .put(this.documentDetailsUrl(document.id), document)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createDocument(document: Document) {
    return this.authHttp
      .post(this.documentsUrl, document)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  deleteDocument(documentId: string) {
    return this.authHttp
      .delete(this.documentDetailsUrl(documentId))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
