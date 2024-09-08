import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesion',
  standalone: true,
  imports: [],
  templateUrl: './profesion.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class ProfesionComponent {
  constructor(private readonly router: Router) {}

  generateResults() {
    this.router.navigateByUrl('/dashboard/profesion/resultados')
  }
}
