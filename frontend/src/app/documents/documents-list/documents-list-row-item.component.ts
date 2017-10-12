import {Component, Input} from '@angular/core';
import {Document} from "../document";

@Component({
  selector: 'documents-list-row-item',
  template: `    
    <div class="document-row row" [class.last]="last">
      <div class=" col-1">
        <i class="fa fa-file-o document-icon" aria-hidden="true"></i>
      </div>
      <div class="document-name col">
        <span class="d-none d-md-block">{{document.name}}</span>
        <a class="d-block d-md-none" target="_blank" href="{{document.download_url}}">{{document.name}}</a>
      </div>
      <div class="document-link-desktop col-2 d-none d-md-block">
        <a target="_blank" href="{{document.download_url}}" class="btn btn-primary">View</a>
      </div>
    </div>
  `,
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListRowItemComponent {

  @Input() document: Document;
  @Input() last: boolean;

  constructor(){}

}
