import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'SuccessPopUp',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './success-popup.component.html',
  styles: ':host { display: contents; }'
})
export class SuccessPopupComponent {
  @Input() title = ''
  @Input() aditionalInfo = ''
  @Input() redirectTo = '#'
}
