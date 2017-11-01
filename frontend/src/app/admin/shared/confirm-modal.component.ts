import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nban-confirm-modal',
  template: `
    <ng-template #modal let-c="close" let-d="dismiss">
      <div class="modal-header">
        <h5 class="modal-title">Confirm Action</h5>
        <button type="button" class="close" aria-label="Close" (click)="d()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p *ngIf="isBodyString()">{{body}}</p>
        <ng-container *ngIf="isBodyTemplate()" [ngTemplateOutlet]="body"></ng-container>
      </div>
      <div class="modal-footer">
        <button *ngFor="let button of buttons" type="button"
                class="btn"
                [class.btn-outline-secondary]="button.type === 'secondary'"
                [class.btn-outline-success]="button.type === 'success'"
                [class.btn-outline-danger]="button.type === 'danger'"
                (click)="handleClick(d, c, button.handler)"
        >{{button.text}}</button>
      </div>
    </ng-template>
  `
})
export class ConfirmModalComponent {
  @Input() body: string|TemplateRef<any>;
  @Input() buttons: ModalButton[];

  @ViewChild('modal') modal: TemplateRef<any>;

  constructor(private modalService: NgbModal) {}

  open(): void {
    this.modalService.open(this.modal).result.then(result => {
      result();
    }, err => {});
  }

  isBodyString(): boolean {
    return typeof this.body === 'string';
  }

  isBodyTemplate(): boolean {
    return typeof this.body === 'object'; // should be good enough guess
  }

  handleClick(dismiss, close, handler) {
    if (handler) {
      close(handler)
    }
    else {
      dismiss();
    }
  }
}

interface ModalButton {text: string, type: 'secondary'|'danger'|'success', handler?: () => void}
