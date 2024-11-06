import { Component, inject } from '@angular/core';
import { CareerService } from '../../../services/carrera.service';
import { AuthService } from '../../../auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [RouterLink],
  providers: [CareerService],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent {
  constructor(private readonly careerClient: CareerService) {}
  
  private readonly authClient: AuthService = inject(AuthService)

  data: any
  user = this.authClient.currentUser()
  response: any = "hola"

  ngOnInit() {
    this.careerClient.getCareers().subscribe({
      next: career => {this.data = career},
      error: error => {
        console.error('Error: ', error)
      }
    });
  }
}
