import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class EventsService {
    constructor(private httpClient: HttpClient) { }

    getAllEvents() {
        return this.httpClient.get(`${SERVER_DOMAIN}/events`).toPromise();
    }
}
