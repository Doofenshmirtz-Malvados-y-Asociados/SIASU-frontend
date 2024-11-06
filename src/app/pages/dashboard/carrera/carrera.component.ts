import { Component, inject } from '@angular/core';
import { CareerService } from '../../../services/carrera.service';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CareerCourseService } from '../../../services/carreraCurso.service';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [NgClass, MatIconModule, RouterLink],
  providers: [CareerService, CareerCourseService],
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})
export class CarreraComponent {
  constructor(
    private readonly careerClient: CareerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly careerCourseClient: CareerCourseService
  ) {}

  private readonly authClient: AuthService = inject(AuthService)

  user = this.authClient.currentUser()
  career_id = this.activatedRoute.snapshot.paramMap.get('id')
  courses: any
  data: any
  color: string = ""
  intensity: Array<string> = ["-200", "-300", "-400", "-500", "-600", "-700", "-800", "-900", "-950"]

  ngOnInit() {
    this.careerClient.getCareer(this.career_id!).subscribe({
      next: res => { this.data = res },
      error: error => {
        console.error("Error: ", error) 
      }
    })

    this.careerCourseClient.getByFilter(Number(this.career_id!)).subscribe({
      next: res => { this.courses = res; },
      error: error => {
        console.error("Error: ", error);
      }
    })

    switch(this.career_id) {
      case("1"):
        this.color = "sky"
        break;
      case("2"): 
        this.color = "green"
        break;
      case("3"):
        this.color = "orange"
        break;
      case("4"):
        this.color = "teal"
        break;
      case("5"):
        this.color = "purple"
        break;
      case("6"):
        this.color = "rose"
        break;
      case("7"):
        this.color = "yellow"
        break;
    }
  }

  getClassTitle() {
    return "txt-" + this.color + "-400"
  }

  getClassContent() {
    return "txt-" + this.color + "-200"
  }

  getClassBackground(semester: number) {
    return "back-" + this.color + this.intensity[semester - 1]
  }

  getClassText(semester: number) {
    if(semester < 4)
      return 'text-gray-800'
    else
      return 'text-gray-200'
  }

  getClassCareers() {
    return "back-" + this.color + "-300"
  }
}
