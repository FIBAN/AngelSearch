import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import { Angel }    from '../../angels/angel';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'new-angel-form',
  templateUrl: 'new-angel-form.component.html',
  styles: [
    '.ng-valid[required], .ng-valid.required { border-left: 5px solid #42A948; /* green */}',
    '.ng-invalid:not(form) { border-left: 5px solid #a94442; /* red */}'
  ]
})
export class NewAngelFormComponent implements OnInit {

  angelForm: FormGroup;
  industries: string[] = [];

  investmentLevels = Angel.INVESTMENT_LEVELS;

  @Output() onSubmit = new EventEmitter<Angel>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.angelForm = this.fb.group(
      {
        first_name: '',
        last_name: '',
        city: '',
        country: '',
        email: '',
        phone: '',
        network: '',
        linkedin: '',
        bio: '',
        investment_level: ''
      });

    this.industries = [];
  }

  updateIndustries(newIndustries) {
    this.industries = newIndustries;
  }

  submit() {
    this.onSubmit.emit(this.getAngelFromForm())
  }

  private getAngelFromForm(): Angel {
    const rawAngel = this.angelForm.getRawValue();
    rawAngel.industries = this.industries;
    return rawAngel as Angel;
  }



}

