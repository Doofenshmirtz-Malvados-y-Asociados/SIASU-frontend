import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career } from '../interfaces/career.interface';

@Injectable()
export class CareerService {

    constructor(private http: HttpClient) {}

    public getCareers(): Observable<Career> {
        return this.http.get<Career>("http://localhost:3000/career/findAll");
    }

    public getCareer(): Observable<Career> {
        return this.http.get<Career>("http://localhost:3000/career/findById/")
    }
}

