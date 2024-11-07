import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

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
export class ProfesionComponent implements OnInit {
  constructor(private readonly router: Router, private readonly http: HttpClient, private readonly auth: AuthService) {}
  
  user_email = this.auth.currentUser()?.email
  career_id = this.auth.currentUser()?.career_id

  ngOnInit(): void {
    this.http.get(`http://34.125.135.185:3000/response/professional_path/${this.user_email}`).subscribe({
      next: (data) => {
        if(data !== null) this.redirectToResults()
      },
      error: (e) => console.error(e)
    })
  }

  generateResults() {
    this.http.post(`http://34.125.135.185:3000/ai/professional_path/`, {
      user_email: this.user_email,
      career_id: this.career_id,
    }).subscribe({
      next: (data) => {
        if(data !== null) this.redirectToResults()
      },
      error: (e) => console.error(e)
    })
  }

  redirectToResults() {
    this.router.navigateByUrl('/dashboard/profesion/resultados')
  }
}
