import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CareerService } from '../../../../services/carrera.service';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [RouterLink],
  providers: [CareerService],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent {
  constructor(
    private readonly careerClient: CareerService,
    private activatedRoute: ActivatedRoute
  ) {}

  career_id = this.activatedRoute.snapshot.paramMap.get('id')
  data: any

  ngOnInit() {
    this.careerClient.getCareer(this.career_id!).subscribe({
      next: res => { this.data = res },
      error: error => {
        console.error("Error: ", error) 
      }
    })
  }
}
