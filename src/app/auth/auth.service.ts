import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { RegisterInputUser } from './interfaces/register.interface';
import { Observable, catchError, map, of, tap } from "rxjs";
import { LoginResponse } from './interfaces/loginResponse.interface';
import { AuthStatus } from './interfaces/authStatus.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  private _currentUser = signal<string | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.notAuthenticated)

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

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>('http://localhost:3000/auth/login', {email: email, password: password})
      .pipe(
        tap(({user, token}) => {
          this._currentUser.set(user)
          this._authStatus.set(AuthStatus.authenticated)
          localStorage.setItem('token', token)
        }),
        map(token => !!token),
        catchError(e => of(false))
      )
  }
}
