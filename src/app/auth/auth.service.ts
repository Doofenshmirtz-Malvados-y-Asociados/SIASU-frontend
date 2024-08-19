import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { RegisterInputUser } from './interfaces/register.interface';
import { Observable, catchError, map, of, tap, throwError } from "rxjs";
import { LoginResponse } from './interfaces/loginResponse.interface';
import { AuthStatus } from './interfaces/authStatus.enum';
import { User } from './interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() { }

  private router : Router = inject(Router)
  private http: HttpClient = inject(HttpClient)

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.notAuthenticated)

  currentUser = computed(() => this._currentUser())
  authStatus = computed(() => this._authStatus())

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.authenticated)
    localStorage.setItem('token', token)

    return true
  }

  register(payload: RegisterInputUser): Observable<boolean> {
    return this.http.post('http://localhost:3000/auth/register', payload)
      .pipe(
        map(user => !!user),
        catchError(e => of(false))
      )
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>('http://localhost:3000/auth/login', {email: email, password: password})
      .pipe(
        tap(({user, token}) => this.setAuthentication(user, token)),
        map(token => !!token),
        catchError(e => throwError(() => e))
      )
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      this.logout()
      return of(false)
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<LoginResponse>('http://localhost:3000/auth/verify', {headers})
      .pipe(
        tap(({user, token}) => this.setAuthentication(user, token)),
        map(token => !!token),
        catchError((e) => {
          this.logout()
          return of(false)
        })
      )
  }

  changePassword(password: string): Observable<boolean> {
    return this.http.post(`http://localhost:3000/auth/changePassword`, {
      email: this.currentUser()?.email,
      password: password
    })
      .pipe(
        map(user => {
          return !!user
        }),
        catchError(e => {
          return of(false)
        })
      )
  }

  logout(): void {
    localStorage.removeItem('token')
    this._authStatus.set(AuthStatus.notAuthenticated)
    this._currentUser.set(null)
    this.router.navigateByUrl('/')
  }
}
