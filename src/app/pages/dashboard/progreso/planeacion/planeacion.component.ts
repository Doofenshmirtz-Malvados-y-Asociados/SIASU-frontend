import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlaneacionService } from './planeacion.service';

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
  private planeacionService: PlaneacionService = inject(PlaneacionService)

  remainingCourses: any = []

  ngOnInit(): void {
    this.planeacionService.getCoursesRemaining()
      .subscribe({
        next: (res) => {
          this.remainingCourses = res
          console.log(this.remainingCourses)
        },
        error: (e) => console.error(e)
      })
  }
}