import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career } from '../interfaces/career.interface';

@Injectable()
export class CareerCourseService {

    constructor(private http: HttpClient) {}

    params = new HttpParams();

    public getByFilter(career_id?: number, course_id?: string): Observable<Career> {
        this.params = career_id ? this.params.append('career_id', career_id) : this.params.append('career_id', 0)
        this.params = course_id ? this.params.append('course_id', course_id): this.params
        return this.http.get<Career>("http://localhost:3000/career-course/filter", { params: this.params })
    }
}