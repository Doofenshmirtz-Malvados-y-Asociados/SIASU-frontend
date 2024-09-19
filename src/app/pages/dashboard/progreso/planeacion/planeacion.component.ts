import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgresoService } from '../progreso.service';

@Component({
  selector: 'app-planeacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './planeacion.component.html',
  styles: `:host {
    display: block;
    width: 100vw;
    height: 100vh;
  }`
})
export class PlaneacionComponent implements OnInit {
  private progresoService: ProgresoService = inject(ProgresoService)

  remainingCourses: any = []

  ngOnInit(): void {
    this.progresoService.getCoursesRemaining()
      .subscribe({
        next: (res) => {
          this.remainingCourses = res
        },
        error: (e) => console.error(e)
      })
  }
}