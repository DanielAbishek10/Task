import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, searchText: any): any {
    if(!items) return '';
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( (it:any) => {
      return  it.toLowerCase().includes(searchText);
    });
   }

}
