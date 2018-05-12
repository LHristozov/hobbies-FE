import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { CustomComment } from '../custom-comment';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class DestinationInfoService {
  constructor(private httpClient: HttpClient) { }

  getDestinationInfo(name: String): Observable<any> {
      return this.httpClient.get(`${SERVER_DOMAIN}/destination/${name}`);
  }
  getDestinationImgs(name: String): Observable<any> {
    return this.httpClient.get(`${SERVER_DOMAIN}/getDestinationImgs/${name}`);
  }

  getDestinations(): Observable<any> {
    return this.httpClient.get(`${SERVER_DOMAIN}/destination/getDestinations`);
  }

  saveDestinationComment(comment: CustomComment): Observable<any> {
    return this.httpClient.post(`${SERVER_DOMAIN}/saveDestinationComment`, comment);

  }

  getDestinationComments(name: String): Observable<any> {
    return this.httpClient.get(`${SERVER_DOMAIN}/getDestinationComments/${name}`);
  }

}
