import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlaneacionService {
  private http: HttpClient = inject(HttpClient)
  private auth: AuthService = inject(AuthService)

  getCoursesRemaining() {
    const email = this.auth.currentUser()?.email
    const career_id = this.auth.currentUser()?.career_id

    return this.http.get(`http://localhost:3000/course-user/remaining?user_email=${email}&career_id=${career_id}`)
  }
}
