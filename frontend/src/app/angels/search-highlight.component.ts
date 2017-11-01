import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'angel-search-highlight',
  template: `
    <span *ngFor="let part of parts" [class.highlight]="part.highlight">{{part.content}}</span>
  `
})
export class SearchHighlightComponent implements OnInit {
  private _query: string;
  @Input() text: string;

  parts: {content: string, highlight?: boolean}[];

  constructor() {}

  ngOnInit(): void {
  }

  @Input()
  set query(query: string) {
    this._query = query;
    if (query  && query.trim() && query.trim().length > 2) {

      const origQuery = query.trim();
      const origText = this.text;
      const lowercaseQuery = origQuery.toLowerCase();
      const lowercaseText = origText.toLowerCase();

      this.parts = [];
      let currentIdx = 0;
      let nextIdx = lowercaseText.indexOf(lowercaseQuery);
      while (nextIdx !== -1) {
        this.parts.push({ content: origText.substring(currentIdx, nextIdx)});
        this.parts.push({ content: origText.substring(nextIdx, nextIdx + lowercaseQuery.length), highlight: true});
        currentIdx = nextIdx + lowercaseQuery.length;
        nextIdx = lowercaseText.indexOf(lowercaseQuery, currentIdx);
      }
      this.parts.push({content: origText.substring(currentIdx)});
    }
    else {
      this.parts = [{ content: this.text }];
    }
  }

}
