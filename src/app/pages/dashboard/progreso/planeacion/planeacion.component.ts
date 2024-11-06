import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgresoService } from '../progreso.service';
import { ToastNotificationsService } from '../../../../components/toast-notifications/services/toast-notifications.service';
import { ResultadosComponent } from "./resultados/resultados.component";

@Component({
  selector: 'app-planeacion',
  standalone: true,
  imports: [RouterLink, ResultadosComponent],
  templateUrl: './planeacion.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class PlaneacionComponent implements OnInit {
  constructor(private readonly progresoService: ProgresoService) {}
  private toastService: ToastNotificationsService = inject(ToastNotificationsService)

  remainingCourses: any = []
  selectedCourses: any = {}
  showResults: boolean = false
  typeOfResult: number = 0

  ngOnInit(): void {
    this.progresoService.getCoursesRemaining()
      .subscribe({
        next: (res) => {
          this.remainingCourses = res
        },
        error: (e) => console.error(e)
      })
  }

  toggleCourse(course: any) {
    if (course.course_id in this.selectedCourses) {
      delete this.selectedCourses[course.course_id]
    } else {
      this.selectedCourses[course.course_id] = course.course.avg_difficulty
    }
  }

  simulateSemester() {
    const values = Object.values(this.selectedCourses)
    const avg = values.reduce((prev: number, current: any) => prev += current, 0) / values.length 

    if (values.length === 0) {
      this.toastService.add("Debes de seleccionar al menos 1 materia", "Si necesitas un tiempo fuera de la universidad consulta a tu coordinacion acerca de la licencia", "error")
    }
    
    if (values.length >= 10) {
      this.typeOfResult = 2;
    } else if ((values.length >= 6 && values.length <= 9) || ((values.length >= 5 && avg >= 80))) {
      this.typeOfResult = 1;
    } else {
      this.typeOfResult = 0;
    }

    this.showResults = true
  }
}