import { Pipe, PipeTransform } from '@angular/core';
import {Angel} from "./angel";
import {AngelFilter} from "./angel-filter";

@Pipe({name: 'angelFilter'})
export class AngelFilterPipe implements PipeTransform {

  transform(data: Angel[], params: AngelFilter): Angel[] {
    console.log("params:", params);
    data = this.filterByCity(data, params.cities);
    data = this.filterByCountry(data, params.countries);
    data = this.filterByQuery(data, params.searchString);
    return data;
  }

  private filterByQuery(data: Angel[], query): Angel[] {
    if(!query){
      return data;
    } else {
      return data.filter((angel) =>
        (angel.first_name && this.contains(angel.first_name, query)) ||
        (angel.last_name && this.contains(angel.last_name, query)) ||
        (angel.email && this.contains(angel.email, query)) ||
        (angel.country && this.contains(angel.country, query)) ||
        (angel.city && this.contains(angel.city, query))
      );
    }
  }

  private filterByCountry(data: Angel[], countries): Angel[] {
    if(!countries || !countries.length) {
      return data;
    } else {
      countries = countries.map(c => c.toLowerCase());
      return data.filter((angel) => angel.country && countries.indexOf(angel.country.toLowerCase()) !== -1);
    }
  }

  private filterByCity(data: Angel[], cities): Angel[] {
    if(!cities || !cities.length) {
      return data;
    } else {
      cities = cities.map(c => c.toLowerCase());
      return data.filter((angel) => angel.city && cities.indexOf(angel.city.toLowerCase()) !== -1);
    }
  }

  private contains(str: string, query: string): boolean {
    if(!str) return false;
    if(!query) return true;
    const lq = query.toLowerCase();
    return str.toLowerCase().indexOf(lq) !== -1;
  }

}
