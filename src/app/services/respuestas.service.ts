import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from "../interfaces/response.interface";

@Injectable()
export class ResponseService {

    constructor (private http: HttpClient) {}
    
    public getResponseByUser(user: string): Observable<Response> {
        console.log(this.http.get<Response>("http://localhost:3000/response/findOne?" + `user=${user}`))
        return this.http.get<Response>("http://localhost:3000/response/findOne?" + `user=${user}`)
        
    }
}
