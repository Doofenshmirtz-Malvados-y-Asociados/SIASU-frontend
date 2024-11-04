import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByName',
  standalone: true
})
export class OrderByNamePipe implements PipeTransform {
  transform(value: any[]): any[] {
    console.log(value)
    return value.toSorted((n1, n2) => {
      if (n1.course.name < n2.course.name) {
        return -1;
      } else if (n1.course.name > n2.course.name) {
        return 1;
      }

      return 0;
    });
  }
}