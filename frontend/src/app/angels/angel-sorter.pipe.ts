import { Pipe, PipeTransform } from '@angular/core';
import {Angel} from "./angel";

@Pipe({name: 'angelSorter'})
export class AngelSorterPipe implements PipeTransform {

  transform(data: Angel[], sortBy?: string, reverse?: boolean): Angel[] {
    if(data && sortBy) {
      const r = reverse ? -1 : 1;
      data.sort((a, b) => {
        if(a[sortBy] === null && b[sortBy] !== null) return -1 * r;
        if(b[sortBy] === null && a[sortBy] !== null) return 1 * r;
        if (a[sortBy] > b[sortBy]) return 1 * r;
        if (a[sortBy] < b[sortBy]) return -1 * r;
        return 0;
      });
    }
    return data;
  }

}
