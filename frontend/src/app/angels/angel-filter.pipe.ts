import { Pipe, PipeTransform } from '@angular/core';
import {Angel} from "./angel";
import {AngelFilter} from "./angel-filter";

@Pipe({name: 'angelFilter'})
export class AngelFilterPipe implements PipeTransform {

  transform(data: Angel[], params: AngelFilter): Angel[] {
    console.log("params:", params);
    data = this.filterByCity(data, params.cities);
    data = this.filterByCountry(data, params.countries);
    data = this.filterByIndustry(data, params.industries);
    data = this.filterByQuery(data, params.searchString);
    return data;
  }

  private filterByQuery(data: Angel[], query): Angel[] {
    if(!query){
      return data;
    } else {
      return data.filter((angel) =>
        (angel.first_name && this.strContains(angel.first_name, query)) ||
        (angel.last_name && this.strContains(angel.last_name, query)) ||
        (angel.email && this.strContains(angel.email, query)) ||
        (angel.country && this.strContains(angel.country, query)) ||
        (angel.city && this.strContains(angel.city, query))
      );
    }
  }

  private filterByCountry(data: Angel[], countries: string[]): Angel[] {
    if(!countries || !countries.length) {
      return data;
    } else {
      countries = countries.map(c => c.toLowerCase());
      return data.filter((angel) => angel.country && countries.indexOf(angel.country.toLowerCase()) !== -1);
    }
  }

  private filterByCity(data: Angel[], cities: string[]): Angel[] {
    if(!cities || !cities.length) {
      return data;
    } else {
      cities = cities.map(c => c.toLowerCase());
      return data.filter((angel) => angel.city && cities.indexOf(angel.city.toLowerCase()) !== -1);
    }
  }

  private filterByIndustry(data: Angel[], industries: string[]): Angel[] {
    if(!industries || !industries.length) {
      return data;
    } else {
      industries = industries.map(c => c.toLowerCase());
      return data.filter((angel) => angel.industries && this.containsSome(angel.industries.map(i => i.toLowerCase()), industries));
    }
  }

  private strContains(str: string, query: string): boolean {
    if(!str) return false;
    if(!query) return true;
    const lq = query.toLowerCase();
    return str.toLowerCase().indexOf(lq) !== -1;
  }

  private containsSome(haystack: string[], needles: string[]): boolean {
    haystack.sort();
    needles.sort();
    let hi=0, ni=0;

    while( hi < haystack.length && ni < needles.length )
    {
      if      (haystack[hi] < needles[ni] ){ hi++; }
      else if (haystack[hi] > needles[ni] ){ ni++; }
      else /* they're equal */
      {
        return true;
      }
    }

    return false;
  }

}
