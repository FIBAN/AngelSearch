import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

export class AngelFilterParameters {
  searchString$: Subject<string>;
  cities$: Subject<string[]>;

  params$: Observable<any>;

  constructor(searchString?: string, cities?: string[]) {
    this.searchString$ = new BehaviorSubject(searchString || "");
    this.cities$ = new BehaviorSubject(cities || []);

    this.params$ = Observable.combineLatest(this.searchString$, this.cities$)
      .map(v => {
        return {
          searchString: v[0],
          cities: v[1]
        }
      })
  }


}
