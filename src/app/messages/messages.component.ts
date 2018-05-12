import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Destination } from '../destination';
import { Location } from '@angular/common';
import { MouseEvent } from '@agm/core';
import { Messages } from '../messages';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { UserProfileService } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  providers: [ MessagesService, UserService, UserProfileService ],
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  message: Messages = new Messages();
  user: User = new User();
  filteredUsersList: any[];
  query: any;


  constructor(private messagesService: MessagesService,
              private location: Location,
              private userService: UserService,
              private userProfileService: UserProfileService
              ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.userProfileService.getUserByUsername(user.username).then(res => {
      this.message.sender = res['id'];
      console.log(this.user);
      }).catch(err => {
      console.error(err);
    });

  }
  sendMessage() {
    this.messagesService.sendMessage(this.message).then(res => {
      // this.location.back();
     this.user = null;
      this.message.content = '';
    }).catch(err => {
      console.error(err);
    });
  }

  setUserId($event) {
    this.message.receiver = this.user.id;
  }

  filter(event) {
    this.query = event.query;
    this.userService.getAllUsers().then( (res: any) => {
      this.filteredUsersList = this.filterUsers(this.query, res);
    }).catch(err => {
      console.error(err);
    });
}

filterUsers(query, users: User[]): any[] {
  // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  const filtered: any[] = [];
  for (let i = 0; i < users.length; i++) {
      const user: User = users[i];
      if (user.username.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filtered.push(user);
      }
  }
  return filtered;
}



}
