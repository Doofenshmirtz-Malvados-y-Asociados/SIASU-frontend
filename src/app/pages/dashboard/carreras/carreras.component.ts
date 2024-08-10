import { Component } from '@angular/core';
import { CareerService } from '../../../services/carrera.service';
import { Career } from '../../../interfaces/career.interface';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [],
  providers: [CareerService],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent {
  constructor(private readonly careerService: CareerService) {}
  data: any
  career_id: any

  ngOnInit() {
    this.career_id = localStorage.getItem("career");
    this.careerService.getCareers().subscribe(career => {this.data = career});
  }

  
}
