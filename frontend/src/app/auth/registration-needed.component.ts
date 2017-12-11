import { Component} from '@angular/core';

@Component({
  template: `
    <h3>Membership Required</h3>
    <p>We are sorry. The Nordic Business Angels List is only available to the members of Nordic Business Angels Network.
      If you want to become a member you can apply for a membership <a href="https://www.nordicban.net/join.html">here</a>
    </p>
    
    <p>If you are already a member of Nordic Business Angels List but still can't access the service you can contact 
      Claes Mikko at claes.mikko(at)nordicban.net for assistance</p>
  `
})
export class RegistrationNeededComponent {

  constructor() {
  }
}
