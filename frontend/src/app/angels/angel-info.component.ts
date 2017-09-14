import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

import { Angel } from './angel';

@Component({
  selector: 'angel-info',
  template: `    
    <div class="card">
      <div class="card-header">Details</div>
      <table class="table">
        <tbody>
        <tr *ngFor="let prop of angelProps">
          <td><span class="propLabel">{{prop.name}}</span></td>
          <td>
            <span *ngIf="!prop.template">{{angel[prop.key]}}</span>
            <ng-template *ngIf="prop.template" [ngTemplateOutlet]="prop.template"></ng-template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <ng-template #linkedInTmpl>
      <a *ngIf="angel.linkedin" target="_blank" href="https://www.linkedin.com/in/{{angel.linkedin}}/" class="linkedin-link"><i class="fa fa-linkedin-square" aria-hidden="true"></i> profile</a>
    </ng-template>
    <ng-template #investmentLevelTmpl>
      {{investmentLevelStr(angel.investment_level)}}
    </ng-template>
    <ng-template #industriesTmpl>
      <ul class="list-unstyled">
        <li *ngFor="let industry of angel.industries">{{industry}}</li>
      </ul>
    </ng-template>
    
  `,
  styles: [
    'span.propLabel {font-weight: bold;}',
    'table td:first-child {width: 120px;text-align: right;}',
    '.linkedin-link {color: #2d6987;}'
  ]
})
export class AngelInfoComponent implements OnInit {
  @ViewChild('linkedInTmpl') linkedInTmpl: TemplateRef<any>;
  @ViewChild('investmentLevelTmpl') investmentLevelTmpl: TemplateRef<any>;
  @ViewChild('industriesTmpl') industriesTmpl: TemplateRef<any>;
  @Input() angel: Angel;

  angelProps: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.angelProps = [
      {name: 'First name', key: 'first_name'},
      {name: 'Last name', key: 'last_name'},
      {name: 'Email', key: 'email'},
      {name: 'Phone', key: 'phone'},
      {name: 'City', key: 'city'},
      {name: 'Country', key: 'country'},
      {name: 'Network', key: 'network'},
      {name: 'LinkedIn', key: 'linkedin', template: this.linkedInTmpl},
      {name: 'Investments', key: 'investment_level', template: this.investmentLevelTmpl},
      {name: 'Industries', key: 'industries', template: this.industriesTmpl},
      {name: 'Bio', key: 'bio'}
    ];
  }

  investmentLevelStr(level): string {
    return Angel.INVESTMENT_LEVELS[level];
  }


}
