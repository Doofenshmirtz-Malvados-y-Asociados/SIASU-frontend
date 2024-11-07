import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from "../interfaces/response.interface";

@Injectable()
export class ResponseService {

    constructor (private readonly http: HttpClient) {}
    
    public getResponseByUser(user: string): Observable<Response> {
        return this.http.get<Response>("http://34.125.135.185:3000/response/" + `${user}`)
        
    }
}
