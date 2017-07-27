import {Component, Input} from '@angular/core';

import { Angel } from './angel';

@Component({
  selector: 'angel-info',
  template: `
    <div class="panel panel-default ">
      <div class="panel-heading">Details</div>
      <table class="table">
        <tbody>
        <tr *ngFor="let key of angel | keys">
          <td><span class="propLabel">{{key}}</span></td>
          <td>{{angel[key]}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    'span.propLabel {font-weight: bold;}',
    'table td:first-child {width: 120px;text-align: right;}'
  ]
})
export class AngelInfoComponent {
  @Input() angel: Angel;

  constructor() {
  }


}
