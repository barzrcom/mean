import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

import { User } from '../shared/models/user.model';
import { DVC } from 'distinct-value-counter';

/**
 * For HyperLogLog counting of the users' domains we use an outside lib:
 * https://github.com/bryanch/distinct-value-counter
 */

@Injectable()
export class UserService {
  private domainsCounter: DVC;
  private counter = require('distinct-value-counter');

  constructor(private http: HttpClient) { 
    this.domainsCounter = this.counter(0.001);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/user', user);
  }

  login(credentials): Observable<any> {
    return this.http.post<any>('/api/login', credentials);
  }

  getUsers(): Observable<User[]> {
    var observable = this.http.get<User[]>('/api/users');
    observable.subscribe(
      users => {
        this.domainsCounter = this.counter(0.001);
        users.forEach(element => {
          this.domainsCounter.add(this.getEmailDomain(element.email));
        });
      }
    )
    return observable;
  }

  private getEmailDomain(email: string): string{
    var domain = email.replace(/.*@/, "");
    return domain;
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('/api/users/count');
  }

  getRolesCount(): Observable<string> {
    return this.http.get<string>('/api/users/roles_count');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('/api/user', user);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`/api/user/${user._id}`);
  }

  editUser(user: User): Observable<string> {
    return this.http.put(`/api/user/${user._id}`, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<string> {
    return this.http.delete(`/api/user/${user._id}`, { responseType: 'text' });
  }

  getUsersDomainsCount(): Observable<number> {
    return of(this.domainsCounter.count());
  }

}
