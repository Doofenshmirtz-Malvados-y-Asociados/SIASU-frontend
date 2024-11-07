import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../interfaces/course.interface";

@Injectable()
export class CourseService {
    constructor(private readonly http: HttpClient) {}

    public getCourse(id: string): Observable<Course> {
        return this.http.get<Course>(`http://34.125.135.185:3000/course/${id}`)
    }
}