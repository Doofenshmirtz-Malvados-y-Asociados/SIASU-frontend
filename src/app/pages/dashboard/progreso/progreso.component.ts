import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-progreso',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './progreso.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class ProgresoComponent {

}
