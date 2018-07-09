import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Event } from '../event';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class NewEventService {
    constructor(private httpClient: HttpClient) { }

    createNewEvent(event: Event) {
        return this.httpClient.post(`${SERVER_DOMAIN}/events/saveEvent`, event).toPromise();
    }

    getAllCategories() {
      return this.httpClient.get(`${SERVER_DOMAIN}/getAllCategories`).toPromise();
  }

}
