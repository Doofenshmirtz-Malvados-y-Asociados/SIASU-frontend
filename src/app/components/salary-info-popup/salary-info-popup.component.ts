import { Component, Input } from '@angular/core';

@Component({
  selector: 'SalaryInfoPopUp',
  standalone: true,
  imports: [],
  templateUrl: './salary-info-popup.component.html',
  styles: ':host { display: contents; }'
})
export class SalaryInfoPopUp {
  @Input() toggleValue!: boolean
  @Input() toggleFn!: Function
}
