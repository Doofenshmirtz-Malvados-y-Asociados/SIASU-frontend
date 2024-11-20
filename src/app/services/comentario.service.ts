import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comment } from "../interfaces/comment.interface";

@Injectable()
export class CommentService {
    constructor(private readonly http: HttpClient) {}

    public getCommentByPage(id: string): Observable<Comment> {
        return this.http.get<Comment>(`http://34.16.239.188:3000/comment/findByPage/${id}`)
    }
}