import { Component } from '@angular/core';
import { CareerService } from '../../../services/carrera.service';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [],
  providers: [CareerService],
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})
export class CarreraComponent {
  constructor(private readonly careerService: CareerService) {}

  

  ngOnInit() {
    localStorage.getItem("career")

  }
  onSubmit() {
  }

  
}
