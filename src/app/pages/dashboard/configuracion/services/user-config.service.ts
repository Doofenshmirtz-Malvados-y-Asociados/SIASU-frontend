import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';


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
    return this.http.patch(`http://localhost:3000/user/${accountData.email}`, {
      name: accountData.name
    })
      .pipe(
        map(user => !!user),
        catchError(e => of(false))
      )
  }
  
  changeCareerSettings(careerSettings: careerSettings) {
    return this.http.post(`http://localhost:3000/career-user`, careerSettings)
      .pipe(
        map(user => !!user),
        catchError(e => of(false))
      )
  }
}
