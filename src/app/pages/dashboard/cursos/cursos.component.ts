import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CourseService } from '../../../services/curso.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../../interfaces/course.interface';
import { CareerCourseService } from '../../../services/carreraCurso.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [NgClass, RouterLink],
  providers: [CareerCourseService, CourseService],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  constructor(
    private readonly courseClient: CourseService, 
    private readonly careerCourseClient: CareerCourseService,
    private activateRoute: ActivatedRoute,
  ) {}

  careers: any
  color: string = ""
  course_id = this.activateRoute.snapshot.paramMap.get('id')
  course_data: Course = { id: "", name: "", credits: 0 }
  

  ngOnInit() {
    this.courseClient.getCourse(this.course_id!).subscribe({
      next: res => {(
        this.course_data = res,
        this.color = this.setColor()
      )},
      error: error => {
        console.error("Error: ", error)
      }
    })

    this.careerCourseClient.getByFilter(undefined, this.course_id!).subscribe({
      next: res => {this.careers = res},
      error: error => {
        console.error("Error: ", error)
      }
    })
  }

  setColor() {
    switch(this.course_data.id.slice(-1)) {
      case("0"):
        return "stone"
      case("1"):
        return "sky"
      case("2"): 
        return "green"
      case("3"):
        return "orange"
      case("4"):
        return "teal"
      case("5"):
        return "purple"
      case("6"):
        return "rose"
      case("7"):
        return "yellow"
      case("8"):
        return "indigo"
      case("9"):
        return "pink"
      default:
        return "black"
    }
  }

  getClassTitle() {
    return "txt-" + this.color + "-400"
  }

  getClassContent() {
    return "txt-" + this.color + "-200"
  }
}
