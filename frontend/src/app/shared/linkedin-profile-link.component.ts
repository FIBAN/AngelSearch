import {Component, Input} from '@angular/core';

@Component({
  selector: 'nban-linkedin-profile-link',
  template: `
    <a target="_blank" href="https://www.linkedin.com/in/{{profileId}}/" class="linkedin-link">
      <i class="fa fa-linkedin-square" aria-hidden="true"></i> profile
    </a>
  `,
  styles: [
    '.linkedin-link {color: #2d6987; white-space: nowrap;}',
    '.linkedin-link:hover {color: #1a3c4e;}'
  ]
})
export class LinkedinProfileLinkComponent {
  @Input() profileId;
}
