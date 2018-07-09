import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class EventsService {
    constructor(private httpClient: HttpClient) { }

    getAllEvents() {
        return this.httpClient.get(`${SERVER_DOMAIN}/events`).toPromise();
    }

    getRecommended(username: String): Observable<any> {
    return this.httpClient.get(`${SERVER_DOMAIN}/events/getRecommended/${username}`);
  }
    getUserEvents(name: String): Observable<any> {
      return this.httpClient.get(`${SERVER_DOMAIN}/events/getEventsByUser/${name}`);
    }

    getNextEventByUser(name: String): Observable<any> {
        return this.httpClient.get(`${SERVER_DOMAIN}/events/getNextEventByUser/${name}`);
      }


}
