import {Component, Input, OnInit} from '@angular/core';
import * as Papa from 'papaparse';

import { Angel } from '../../angels/angel';
import 'rxjs/add/operator/switchMap';
import {AngelService} from "../../angels/angel.service";
import { Utils } from "../../utils/parsers";

@Component({
  selector: 'admin-batch-insert',
  templateUrl: 'add-multiple-angels.component.html',
  styles: [
  ]
})
export class AddMultipleAngelsComponent implements OnInit {

  angels: Angel[];

  processing: boolean = false;

  complete: boolean = false;

  error: string;

  constructor(private angelService: AngelService) {}

  ngOnInit(): void {}

  changeListener($event): void {
    this.complete = false;
    this.error = "";
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];

    this.processing = true;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        if(results.errors.length) {
          console.error(results.errors);
          this.error = "CSV parse error";
        } else {
          this.angels = this.parseAngels(results.data);
        }
        this.processing = false;
      }
    });
  }

  parseAngels(data: any[]): Angel[] {
    const results: Angel[] = [];
    if(data) {
      for (const row of data) {
        const angel = new Angel(
          "",
          row.first_name,
          row.last_name,
          row.email,
        );
        angel.phone = row.phone;
        angel.city = row.city;
        angel.country = row.country;
        angel.network = row.network;
        angel.linkedin = Utils.parseLinkedInId(row.linkedin);
        angel.investment_level = row.investment_level;
        angel.bio = row.bio;
        angel.industries = this.parseIndustries(row.industries);
        results.push(angel);
      }
    }
    return results;
  }

  parseIndustries(input: string): string[] {
    const results: string[] = [];
    if(input) {
      const industries = input.split(',');
      for (let industry of industries) {
        industry = industry.trim();
        if(results.indexOf(industry) === -1) {
          results.push(industry);
        }
      }
    }
    return results;
  }

  investmentLevelString(investmentLevel: number): string {
    if(investmentLevel || investmentLevel === 0) {
      return Angel.INVESTMENT_LEVELS[investmentLevel];
    }
    else {
      return "";
    }
  }

  saveAngels(): void {
    this.processing = true;
    let savedCount = 0;
    const result = this.angels.reduce(
      (promise: Promise<any>, angel: Angel) => promise.then(() => this.angelService.createAngel(angel).then(() => savedCount += 1)),
      Promise.resolve()
    );
    result
      .then(() => {
        this.complete = true;
        this.processing = false;
      })
      .catch((err) => {
        console.error(err);
        this.error = "Error while saving angels to the database. Managed to save " + savedCount + " out of " + this.angels.length + " angels";
        this.processing = false;
      })
  }


}
