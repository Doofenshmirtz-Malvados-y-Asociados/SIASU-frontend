import { Component, Input } from '@angular/core';

@Component({
  selector: 'ErrorPopUp',
  standalone: true,
  imports: [],
  templateUrl: './error-popup.component.html',
  styles: ':host { display: contents; }'
})
export class ErrorPopupComponent {
  @Input() title = ''
  @Input() aditionalInfo = ''
  @Input() toggleValue!: string | number | boolean
  @Input() toggleFn!: Function
}
