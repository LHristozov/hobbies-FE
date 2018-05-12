import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { CustomComment } from '../custom-comment';
import { Event } from '../event';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class EventInfoService {
  constructor(private httpClient: HttpClient) { }

  getEventInfo(name: String): Observable<any> {
      return this.httpClient.get(`${SERVER_DOMAIN}/events/event-info/${name}`);
  }
  getEventImgs(name: String): Observable<any> {
    return this.httpClient.get(`${SERVER_DOMAIN}/getDestinationImgs/${name}`);
  }

  getEvents(): Observable<any> {
    return this.httpClient.get(`${SERVER_DOMAIN}/event/getevents`);
  }

  saveEventComment(comment: CustomComment): Observable<any> {
    return this.httpClient.post(`${SERVER_DOMAIN}/saveEventComment`, comment);

  }

  getEventComments(name: String): Observable<any> {
    return this.httpClient.get(`${SERVER_DOMAIN}/getEventComments/${name}`);
  }

  getEventParticipants(name: String): Observable<any> {
    return this.httpClient.get(`${SERVER_DOMAIN}/events/getEventParticipants/${name}`);
  }

  registerForEvent(event: Event): Observable<any> {
    return this.httpClient.post(`${SERVER_DOMAIN}/events/registerForEvent`, event);
  }

  // saveComment(): Observable<any>{
  //   return
  // }

}
