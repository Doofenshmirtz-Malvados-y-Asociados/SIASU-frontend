import { Component, inject } from '@angular/core';
import { CareerService } from '../../../services/carrera.service';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { CareerCourseService } from '../../../services/carreraMateria.service';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [NgClass],
  providers: [CareerService, CareerCourseService],
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})
export class CarreraComponent {
  constructor(
    private readonly careerClient: CareerService,
    private activatedRoute: ActivatedRoute,
    private careerCourseClient: CareerCourseService
  ) {}

  private authClient: AuthService = inject(AuthService)

  user = this.authClient.currentUser()
  career_id = this.activatedRoute.snapshot.paramMap.get('id')
  courses: any
  data: any
  colors: Array<string> = ["", "", "", "", "", "", "", "", ""]
  color_title: string = ""
  color_obj: string = ""

  ngOnInit() {
    this.careerClient.getCareer(this.career_id!).subscribe({
      next: res => { this.data = res },
      error: error => {
        console.error("Error: ", error) 
      }
    })

    this.careerCourseClient.getByFilter(Number(this.career_id!)).subscribe({
      next: res => {this.courses = res},
      error: error => {
        console.error("Error: ", error) 
      }
    })

    switch(this.career_id) {
      case("1"):
        this.color_title = "text-sky-400"
        this.color_obj = "text-sky-200"
        this.colors[0] = "bg-sky-200/75"
        this.colors[1] = "bg-sky-300/75"
        this.colors[2] = "bg-sky-400/75"
        this.colors[3] = "bg-sky-500/75"
        this.colors[4] = "bg-sky-600/75"
        this.colors[5] = "bg-sky-700/75"
        this.colors[6] = "bg-sky-800/75"
        this.colors[7] = "bg-sky-900/75"
        this.colors[8] = "bg-sky-950/75"
        break;
      case("2"): 
        this.color_title = "text-green-400"
        this.color_obj = "text-green-200"
        this.colors[0] = "bg-green-200/75"
        this.colors[1] = "bg-green-300/75"
        this.colors[2] = "bg-green-400/75"
        this.colors[3] = "bg-green-500/75"
        this.colors[4] = "bg-green-600/75"
        this.colors[5] = "bg-green-700/75"
        this.colors[6] = "bg-green-800/75"
        this.colors[7] = "bg-green-900/75"
        this.colors[8] = "bg-green-950/75"
        break;
      case("3"):
        this.color_title = "text-orange-400"
        this.color_obj = "text-orange-200"
        this.colors[0] = "bg-orange-200/75"
        this.colors[1] = "bg-orange-300/75"
        this.colors[2] = "bg-orange-400/75"
        this.colors[3] = "bg-orange-500/75"
        this.colors[4] = "bg-orange-600/75"
        this.colors[5] = "bg-orange-700/75"
        this.colors[6] = "bg-orange-800/75"
        this.colors[7] = "bg-orange-900/75"
        this.colors[8] = "bg-orange-950/75"
        break;
      case("4"):
        this.color_title = "text-teal-400"
        this.color_obj = "text-teal-200"
        this.colors[0] = "bg-teal-200/75"
        this.colors[1] = "bg-teal-300/75"
        this.colors[2] = "bg-teal-400/75"
        this.colors[3] = "bg-teal-500/75"
        this.colors[4] = "bg-teal-600/75"
        this.colors[5] = "bg-teal-700/75"
        this.colors[6] = "bg-teal-800/75"
        this.colors[7] = "bg-teal-900/75"
        this.colors[8] = "bg-teal-950/75"
        break;
      case("5"):
        this.color_title = "text-purple-400"
        this.color_obj = "text-purple-200"
        this.colors[0] = "bg-purple-200/75"
        this.colors[1] = "bg-purple-300/75"
        this.colors[2] = "bg-purple-400/75"
        this.colors[3] = "bg-purple-500/75"
        this.colors[4] = "bg-purple-600/75"
        this.colors[5] = "bg-purple-700/75"
        this.colors[6] = "bg-purple-800/75"
        this.colors[7] = "bg-purple-900/75"
        this.colors[8] = "bg-purple-950/75"
        break;
      case("6"):
        this.color_title = "text-rose-400"
        this.color_obj = "text-rose-200"
        this.colors[0] = "bg-rose-200/75"
        this.colors[1] = "bg-rose-300/75"
        this.colors[2] = "bg-rose-400/75"
        this.colors[3] = "bg-rose-500/75"
        this.colors[4] = "bg-rose-600/75"
        this.colors[5] = "bg-rose-700/75"
        this.colors[6] = "bg-rose-800/75"
        this.colors[7] = "bg-rose-900/75"
        this.colors[8] = "bg-rose-950/75"
        break;
      case("7"):
        this.color_title = "text-yellow-400"
        this.color_obj = "text-yellow-200"
        this.colors[0] = "bg-yellow-200"
        this.colors[1] = "bg-yellow-300"
        this.colors[2] = "bg-yellow-400"
        this.colors[3] = "bg-yellow-500"
        this.colors[4] = "bg-yellow-600"
        this.colors[5] = "bg-yellow-700"
        this.colors[6] = "bg-yellow-800"
        this.colors[7] = "bg-yellow-900"
        this.colors[8] = "bg-yellow-950"
        break;
    }


  }
}
