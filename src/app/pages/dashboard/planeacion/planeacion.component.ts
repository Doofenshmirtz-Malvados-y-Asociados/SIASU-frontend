import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-planeacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './planeacion.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class PlaneacionComponent {

}
