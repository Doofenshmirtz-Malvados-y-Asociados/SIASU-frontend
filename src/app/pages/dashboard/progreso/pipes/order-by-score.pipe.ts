import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByScore',
  standalone: true
})
export class OrderByScorePipe implements PipeTransform {
  transform(value: any[]): any[] {
    console.log(value)
    return value.toSorted((n1, n2) => n2.score - n1.score);
  }
}