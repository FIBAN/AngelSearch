import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {

  transform(value: object, args: string[]): string[] {
    let keys = [];
    for (let key in value) {
      if(value.hasOwnProperty(key)){
        keys.push(key);
      }
    }
    return keys;
  }

}
