import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserConfiguration } from '../dto/UserConfigurationUpdate.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../../../auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  constructor() { }

  private http: HttpClient = inject(HttpClient)
  private authClient: AuthService = inject(AuthService)

  user_email = this.authClient.currentUser()?.email
  
  updateConfiguration(userConfig: UserConfiguration): Observable<boolean> {
    return this.http.post(`http://localhost:3000/auth/changePassword`, userConfig)
      .pipe(
        map(user => {
          console.log(user)
          return !!user
        }),
        catchError(e => {
          return of(false)
        })
      )
  }
}
