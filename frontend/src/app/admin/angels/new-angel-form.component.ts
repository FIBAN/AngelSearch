import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import { Angel }    from '../../angels/angel';

@Component({
  selector: 'new-angel-form',
  templateUrl: 'new-angel-form.component.html',
  styles: [
    '.ng-valid[required], .ng-valid.required { border-left: 5px solid #42A948; /* green */}',
    '.ng-invalid:not(form) { border-left: 5px solid #a94442; /* red */}'
  ]
})
export class NewAngelFormComponent {
  model = new Angel("new", '', '', '');

  @Output() onSubmit = new EventEmitter<Angel>();

  submit() {
    this.onSubmit.emit(this.model)
  }

}

