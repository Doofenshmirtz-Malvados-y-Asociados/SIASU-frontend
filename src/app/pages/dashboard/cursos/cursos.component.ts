import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { CourseService } from '../../../services/curso.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationsService } from '../../../components/toast-notifications/services/toast-notifications.service';
import { Comment } from '../../../interfaces/comment.interface';
import { Course } from '../../../interfaces/course.interface';
import { CareerCourseService } from '../../../services/carreraCurso.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [NgClass, RouterLink, ReactiveFormsModule],
  providers: [CareerCourseService, CourseService],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  constructor(
    private http: HttpClient,
    private authClient: AuthService = inject(AuthService),
    private notificationService: ToastNotificationsService = inject(ToastNotificationsService),
    private readonly courseClient: CourseService, 
    private readonly careerCourseClient: CareerCourseService,
    private activateRoute: ActivatedRoute,
  ) {}

  user = this.authClient.currentUser()

  careers: any
  color: string = ""
  course_id = this.activateRoute.snapshot.paramMap.get('id')
  course_data: Course = { id: "", name: "", credits: 0, avg_difficulty: 0 }
  
  commentsForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onSubmit(page: string) {
    let now = new Date()
    let id = this.user?.email?.toString + "@" + now.toDateString
    console.log(page)
    this.http.post('http://localhost:3000/comment', {
      id: id,
      user: this.user?.email,
      content: this.commentsForm.value?.content,
      page: page
    })
    .subscribe(
      success => {
        if (success) {
          this.notificationService.add("Comentario guardado", "a ver", "success")
        }
        else {
          this.notificationService.add("Comentario no guardado", "a ver", "error")
        }
      }
    )
  }

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
