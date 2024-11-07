import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career } from '../interfaces/career.interface';

@Injectable()
export class CareerService {

    constructor(private readonly http: HttpClient) {}

    public getCareers(): Observable<Career> {
        return this.http.get<Career>("http://34.125.135.185:3000/career/",)
    }

    public getCareer(id: string): Observable<Career> {
        return this.http.get<Career>(`http://34.125.135.185:3000/career/${id}`)
    }
}