import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'nban-editable-industry-list',
  template: `
    <ul class="list-unstyled">
      <li *ngFor="let industry of displayedIndustries">
        {{industry}} <a class="edit-button" (click)="removeIndustry(industry)"
      ><i class="fa fa-times text-danger" aria-hidden="true"></i></a>
      </li>
      <li class="form-inline">
        <input #newIndustry class="form-control mb-2 mr-sm-2 mb-sm-0"
               (keyup.enter)="addIndustry(newIndustry.value)" placeholder="Add an industry"
        >
        <button class="btn btn-success" (click)="addIndustry(newIndustry.value)">Add</button>
      </li>
    </ul>
  `
})
export class EditableIndustryListComponent {

  displayedIndustries: string[];

  @Input() set industries(industries: string[]) {
    this.displayedIndustries = industries.slice(0);
  }
  @Output() onChange = new EventEmitter<string[]>();

  @ViewChild('newIndustry') newIndustryInput: ElementRef;

  removeIndustry(industry): void {
    this.displayedIndustries = this.displayedIndustries.filter(i => i !== industry);
    this.onChange.next(this.displayedIndustries);
  }

  addIndustry(inputString): void {
    if (inputString) {
      for (let industry of inputString.split(',')) {
        industry = industry.trim();
        if (industry && !this.hasIndustry(industry)) {
          this.displayedIndustries.push(industry);
        }
      }
      this.onChange.next(this.displayedIndustries);
      this.newIndustryInput.nativeElement.value = '';
    }
  }

  private hasIndustry(industry): boolean {
    return this.displayedIndustries.indexOf(industry) !== -1;
  }


}
