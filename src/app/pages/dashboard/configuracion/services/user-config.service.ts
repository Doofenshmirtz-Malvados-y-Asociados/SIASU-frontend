import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`)

interface accountData {
  email: string;
  name: string;
}

interface careerSettings {
  email: string;
  career_id: number;
  signedUpAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  constructor() { }

  private http: HttpClient = inject(HttpClient)

  changeAccountSettings(accountData: accountData) {
    return this.http.patch(`http://34.125.135.185:3000/user/${accountData.email}`, {
      name: accountData.name
    }, {headers})
      .pipe(
        map(user => !!user),
        catchError(e => of(false))
      )
  }
  
  changeCareerSettings(careerSettings: careerSettings) {
    return this.http.post(`http://34.125.135.185:3000/career-user`, careerSettings, {headers})
      .pipe(
        map(user => !!user),
        catchError(e => of(false))
      )
  }
}
