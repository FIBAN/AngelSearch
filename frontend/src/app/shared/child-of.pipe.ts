import { Pipe, PipeTransform } from '@angular/core';
import {Document} from '../documents/document';

@Pipe({name: 'childOfDocument'})
export class ChildOfPipe implements PipeTransform {

  transform(data: Document[], parentId: string): Document[] {
    if (data) {
      return data.filter(d => d.parent === parentId);
    }
    else {
      return [];
    }
  }
}
