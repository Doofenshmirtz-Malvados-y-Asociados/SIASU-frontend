import { Component, Input } from '@angular/core';

@Component({
  selector: 'InfoPopUp',
  standalone: true,
  imports: [],
  templateUrl: './info-popup.component.html',
  styles: ':host { display: contents; }'
})
export class InfoPopupComponent {
  @Input() toggleValue!: boolean
  @Input() toggleFn!: Function
}
