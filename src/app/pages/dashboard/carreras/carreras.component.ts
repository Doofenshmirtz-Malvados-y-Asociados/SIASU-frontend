import { Component, inject } from '@angular/core';
import { CareerService } from '../../../services/carrera.service';
import { Career } from '../../../interfaces/career.interface';
import { ResponseService } from '../../../services/respuestas.service';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [RouterLink],
  providers: [CareerService, ResponseService],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent {
  constructor(private readonly careerClient: CareerService, private readonly responseClient: ResponseService) {}
  
  private authClient: AuthService = inject(AuthService)

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
    
    if (!this.user?.career_id) {
      this.responseClient.getResponseByUser(this.user!.email).subscribe(res => {this.response = res})
      console.log(this.response)
    }
  }
}
