import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-glowy-button',
  standalone: true,
  imports: [],
  templateUrl: './glowy-button.component.html',
  styleUrl: './glowy-button.component.css'
})
export class GlowyButtonComponent {
  @Input() buttonText = '';
}
