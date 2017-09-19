import {Component, OnInit} from '@angular/core';
import {StartupService} from "./startup.service";
import {Startup} from "./startup";

@Component({
  selector: 'startups',
  templateUrl: 'startups.component.html',
  styleUrls: ['startups.component.css']
})
export class StartupsComponent implements OnInit {

  startups: Startup[];

  constructor(private startupService: StartupService) {
  }

  ngOnInit(): void {
    this.startupService.getStartups().then((startups) => {
      this.startups = startups;
    })
  }

}
