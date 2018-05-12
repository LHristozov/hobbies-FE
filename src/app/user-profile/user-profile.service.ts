import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../user/user';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class UserProfileService {
  user: User;

    constructor(private httpClient: HttpClient) { }

    getUserByUsername(username: String) {
     // this.user.username = username;
        return this.httpClient.get(`${SERVER_DOMAIN}/getUserByUsername/${username}`).toPromise();
    }

    pushFileToStorage(file: File, id: any) {
      const formdata: FormData = new FormData();

      formdata.append('file', file);

      return this.httpClient.post(`${SERVER_DOMAIN}/uploadImage/${id}`, formdata).toPromise();
  }

    // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    //   const formdata: FormData = new FormData();

    //   formdata.append('file', file);

    //   const req = new HttpRequest('POST', `${SERVER_DOMAIN}/uploadImage/${id}`, formdata, {
    //     reportProgress: true,
    //     responseType: 'text'
    //   });

    //   return this.http.request(req);
    // }

}


