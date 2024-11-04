import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from "../interfaces/response.interface";

const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`)

@Injectable()
export class ResponseService {

    constructor (private readonly http: HttpClient) {}
    
    public getResponseByUser(user: string): Observable<Response> {
        return this.http.get<Response>("http://localhost:3000/response/" + `${user}`, {headers})
        
    }
}
