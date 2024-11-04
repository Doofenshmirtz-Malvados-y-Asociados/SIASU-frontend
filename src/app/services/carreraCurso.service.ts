import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career } from '../interfaces/career.interface';

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`)

@Injectable()
export class CareerCourseService {

    constructor(private readonly http: HttpClient) {}

    params = new HttpParams();

    public getByFilter(career_id?: number, course_id?: string): Observable<Career> {
        this.params = career_id ? this.params.append('career_id', career_id) : this.params.append('career_id', 0)
        this.params = course_id ? this.params.append('course_id', course_id): this.params
        return this.http.get<Career>("http://localhost:3000/career-course/filter", {headers, params: this.params })
    }
}