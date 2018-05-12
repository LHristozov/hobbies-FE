import { Component } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $ from 'jquery';
import { environment } from '../../environments/environment';

const SERVER_DOMAIN = environment.serverDomain;


@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat-component.html',
 styleUrls:  ['./global-chat-component.css'],
})
export class GlobalChatComponent {
  private serverUrl = `${SERVER_DOMAIN}/socket`;
  title = 'Global Chat';
  private stompClient;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          $('.chat').append("<div class='message'>" + message.body + "</div>");
          console.log(message.body);
        }
      });
    });
  }
  // TODO: send username so that can be added to the message
  sendMessage(message) {
    this.stompClient.send('/app/send/message' , {}, message);
    $('#input').val('');
  }
}
