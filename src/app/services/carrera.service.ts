import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career } from '../interfaces/career.interface';

@Injectable()
export class CareerService {

    constructor(private readonly http: HttpClient) {}

    public getCareers(): Observable<Career> {
        return this.http.get<Career>("http://localhost:3000/career/",)
    }

    public getCareer(id: string): Observable<Career> {
        return this.http.get<Career>(`http://localhost:3000/career/${id}`)
    }
}