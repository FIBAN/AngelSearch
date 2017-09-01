import {Component, Input} from '@angular/core';

import { Angel } from './angel';

@Component({
  selector: 'angel-info',
  template: `
    <div class="panel panel-default ">
      <div class="panel-heading">Details</div>
      <table class="table">
        <tbody>
        <tr>
          <td><span class="propLabel">First name</span></td>
          <td>{{angel.first_name}}</td>
        </tr>
        <tr>
          <td><span class="propLabel">Last name</span></td>
          <td>{{angel.last_name}}</td>
        </tr>
        <tr>
          <td><span class="propLabel">Email</span></td>
          <td>{{angel.email}}</td>
        </tr>
        <tr>
          <td><span class="propLabel">Phone</span></td>
          <td>{{angel.phone}}</td>
        </tr>
        <tr>
          <td><span class="propLabel">City</span></td>
          <td>{{angel.city}}</td>
        </tr>
        <tr>
          <td><span class="propLabel">Country</span></td>
          <td>{{angel.country}}</td>
        </tr>
        <tr>
          <td><span class="propLabel">Industries</span></td>
          <td>
            <ul class="list-unstyled">
                <li *ngFor="let industry of angel.industries">{{industry}}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><span class="propLabel">Bio</span></td>
          <td>{{angel.bio}}</td>
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
