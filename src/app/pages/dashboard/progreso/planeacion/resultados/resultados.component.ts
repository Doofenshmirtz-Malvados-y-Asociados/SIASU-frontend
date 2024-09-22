import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-planeacion-resultados',
  standalone: true,
  imports: [],
  templateUrl: './resultados.component.html',
  styles: `:host {
    height: 84.5%;
  }`
})
export class ResultadosComponent {
  @Input({required: true}) typeOfResult!: number;
}
