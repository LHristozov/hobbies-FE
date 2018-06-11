import { Component,OnInit } from '@angular/core';
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
export class GlobalChatComponent implements OnInit  {
  private serverUrl = `${SERVER_DOMAIN}/socket`;
  title = 'Global Chat';
  private stompClient;
  username: String = '';

  constructor() {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    debugger;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
  }
  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    const tt = this.username;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) { 
          debugger;
          $('.chat').prepend("<div style='padding: 10px' class='message'>"+that.username +' '+ message.body + "</div>");
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
