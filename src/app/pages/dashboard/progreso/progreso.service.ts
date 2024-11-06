import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { firstValueFrom, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ProgresoService {
  constructor(private readonly http: HttpClient,  private readonly auth: AuthService) {}

  getCoursesRemaining() {
    const email = this.auth.currentUser()?.email
    const career_id = this.auth.currentUser()?.career_id

    return this.http.get(`http://localhost:3000/course-user/remaining?user_email=${email}&career_id=${career_id}`)
  }

  getCoursesTaken() {
    const email = this.auth.currentUser()?.email
    const career_id = this.auth.currentUser()?.career_id

    const coursesOfCareer = this.http.get(`http://localhost:3000/career-course/filter?career_id=${career_id}`)
    const coursesTaken = this.http.get(`http://localhost:3000/course-user/filter?user_email=${email}`)

    return forkJoin([coursesOfCareer, coursesTaken])
  }
}
