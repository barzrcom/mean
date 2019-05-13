import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Comment } from '../shared/models/comment.model';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('/api/comment', comment);
  }

  getComment(id: String): Observable<Comment> {
    return this.http.get<Comment>(`/api/comment/${id}`);
  }

  editComment(comment: Comment): Observable<string> {
    return this.http.put(`/api/comment/${comment._id}`, comment, { responseType: 'text' });
  }

  deleteComment(comment: Comment): Observable<string> {
    return this.http.delete(`/api/comment/${comment._id}`, { responseType: 'text' });
  }

}
