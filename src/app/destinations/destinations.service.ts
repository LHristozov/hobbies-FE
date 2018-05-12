import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class DestinationsService {
    constructor(private httpClient: HttpClient) { }

    getAllDestinations() {
        return this.httpClient.get(`${SERVER_DOMAIN}/destination/getDestinations`).toPromise();
    }
}
