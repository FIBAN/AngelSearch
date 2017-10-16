import { Pipe, PipeTransform } from '@angular/core';
import {Angel} from "../angels/angel";
import {isNullOrUndefined} from "util";

@Pipe({name: 'angelSorter'})
export class AngelSorterPipe implements PipeTransform {

  transform(data: Angel[], sortBy?: string[], reverse?: boolean): Angel[] {
    if(data && sortBy) {
      const r = reverse ? -1 : 1;
      data.sort((a: Angel, b: Angel) => {
        return sortBy.reduce(
          (res, sortByKey) => (res !== 0) ? res : this.compare(a[sortByKey], b[sortByKey]),
          0
        ) * r;
      });
    }
    return data;
  }

  private compare(a: any, b: any): number {
    if(isNullOrUndefined(a) && !isNullOrUndefined(b)) return -1;
    if(isNullOrUndefined(b) && !isNullOrUndefined(a)) return 1;
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }

}
