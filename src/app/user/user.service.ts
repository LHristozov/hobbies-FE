import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from '../user/user';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private httpClient: HttpClient) { }

    getAllUsers() {
      return this.httpClient.get(`${SERVER_DOMAIN}/getAllUsers`).toPromise();
  }

     getAll() {
    return this.http.get<User[]>('/api/users');
  }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
        return this.httpClient.post(`${SERVER_DOMAIN}/register`, user).toPromise();
    }

    update(user: User) {
        return this.http.post(`${SERVER_DOMAIN}/update/` + user.id, user).toPromise();
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}
