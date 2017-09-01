import {Component, Input, TemplateRef, ViewChild} from '@angular/core';

import { Angel } from './angel';

@Component({
  selector: 'angel-info',
  template: `
    <div class="panel panel-default ">
      <div class="panel-heading">Details</div>
      <table class="table">
        <tbody>
        <tr *ngFor="let prop of angelProps">
          <td><span class="propLabel">{{prop.name}}</span></td>
          <td *ngIf="prop.key !== 'linkedin'">{{angel[prop.key]}}</td>
          <td *ngIf="prop.key === 'linkedin'">
            <a href="https://www.linkedin.com/in/{{angel[prop.key]}}/" class="linkedin-link"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
          </td>
        </tr>
        <tr>
          <td><span class="propLabel">Industries</span></td>
          <td>
            <ul class="list-unstyled">
                <li *ngFor="let industry of angel.industries">{{industry}}</li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    'span.propLabel {font-weight: bold;}',
    'table td:first-child {width: 120px;text-align: right;}',
    '.linkedin-link {color: #2d6987;}'
  ]
})
export class AngelInfoComponent {
  @Input() angel: Angel;

  angelProps: any[] = [
    {name: 'First name', key: 'first_name'},
    {name: 'Last name', key: 'last_name'},
    {name: 'Email', key: 'email'},
    {name: 'Phone', key: 'phone'},
    {name: 'City', key: 'city'},
    {name: 'Country', key: 'country'},
    {name: 'Network', key: 'network'},
    {name: 'LinkedIn', key: 'linkedin'},
    {name: 'Bio', key: 'bio'}
  ];

  constructor() {
  }


}
