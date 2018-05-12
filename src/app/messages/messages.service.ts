import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Destination } from '../destination';
import { Messages } from '../messages';

const SERVER_DOMAIN = environment.serverDomain;

@Injectable()
export class MessagesService {
    constructor(private httpClient: HttpClient) { }

    sendMessage(message: Messages) {
        return this.httpClient.post(`${SERVER_DOMAIN}/saveMessage`, message).toPromise();
    }

    pushFileToStorage(file: File, name: any) {
      const formdata: FormData = new FormData();

      formdata.append('file', file);

      return this.httpClient.post(`${SERVER_DOMAIN}/uploadDestinationImage/${name}`, formdata).toPromise();
  }
}
