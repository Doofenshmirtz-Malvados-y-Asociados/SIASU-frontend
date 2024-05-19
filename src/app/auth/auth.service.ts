import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterInputUser } from './interfaces/register.interface';
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  register(payload: RegisterInputUser): Observable<boolean> {
    return this.http.post('http://localhost:3000/auth/register', payload)
      .pipe(
        map(user => !!user),
        catchError(e => of(false))
      )
  }

  associate(email: string, career: string): Observable<boolean> {
    return this.http.post('http://localhost:3000/auth/associate', {email: email, career: career})
      .pipe(
        map(association => !!association),
        catchError(e => of(false))
      )
  }
}
