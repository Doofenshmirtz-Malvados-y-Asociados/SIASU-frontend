import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career } from '../interfaces/career.interface';

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`)

@Injectable()
export class CareerService {

    constructor(private readonly http: HttpClient) {}

    public getCareers(): Observable<Career> {
        return this.http.get<Career>("http://localhost:3000/career/", {headers})
    }

    public getCareer(id: string): Observable<Career> {
        return this.http.get<Career>(`http://localhost:3000/career/${id}`, {headers})
    }
}