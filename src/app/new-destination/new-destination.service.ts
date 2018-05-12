import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Destination } from '../destination';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class NewDestinationService {
    constructor(private httpClient: HttpClient) { }

    createNewDestination(destination: Destination) {
        return this.httpClient.post(`${SERVER_DOMAIN}/destination`, destination).toPromise();
    }

    pushFileToStorage(file: File, name: any) {
      const formdata: FormData = new FormData();

      formdata.append('file', file);

      return this.httpClient.post(`${SERVER_DOMAIN}/uploadDestinationImage/${name}`, formdata).toPromise();
  }
}
