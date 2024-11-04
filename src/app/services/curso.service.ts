import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../interfaces/course.interface";

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`)

@Injectable()
export class CourseService {
    constructor(private readonly http: HttpClient) {}

    public getCourse(id: string): Observable<Course> {
        return this.http.get<Course>(`http://localhost:3000/course/${id}`, {headers})
    }
}