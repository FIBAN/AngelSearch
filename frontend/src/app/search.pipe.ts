import { Pipe, PipeTransform } from '@angular/core';
import {Angel} from "./angel";

@Pipe({name: 'searchFilter'})
export class SearchFilterPipe implements PipeTransform {

  transform(data: Angel[], searchString: string): Angel[] {
    if(searchString === '' || searchString === null || searchString === undefined){
      return data;
    } else {
      const query = searchString.toLowerCase();
      return data.filter((angel) =>
        angel.name.toLowerCase().indexOf(query) !== -1 ||
        angel.email.toLowerCase().indexOf(query) !== -1 ||
        angel.city.toLowerCase().indexOf(query) !== -1
      );
    }
  }

}
