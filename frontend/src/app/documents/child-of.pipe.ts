import { Pipe, PipeTransform } from '@angular/core';
import {Document} from "./document";

@Pipe({name: 'childOfDocument'})
export class ChildOfPipe implements PipeTransform {

  transform(data: Document[], parentId: string): Document[] {
    return data.filter(d => d.parent == parentId);
  }
}
