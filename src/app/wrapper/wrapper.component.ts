import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  moduleId: module.id,
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent {
  currentUser: User;

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  isNotEmptyObject(obj) {
    return !(obj && Object.keys(obj).length === 0);
  }



}
