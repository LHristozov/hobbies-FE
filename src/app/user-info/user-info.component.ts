import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { DestinationsService } from '../destinations/destinations.service';
import { Destination } from '../destination';
import { User } from '../user/user';
import { CustomComment } from '../custom-comment';
import { Event } from '../event';
import { UserProfileService } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  providers: [UserInfoService, UserProfileService],
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  name: String;
  user: User = new User();
  netImage: any = '';


  private _routeSubscription: Subscription = new Subscription();

  constructor(
    private eventInfoService: UserInfoService,
    private userProfileService: UserProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._routeSubscription = this.route.params.subscribe(data => {
      this.name = data['name'];
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = currentUser.username;

    this.userProfileService.getUserByUsername(username).then(res => {
      console.log(`Result ${res}`);
      console.log(res['firstname']);
      this.user.firstname = res['firstname'];
      this.user.lastname = res['lastname'];
      this.user.username = res['username'];
      this.user.email = res['email'];
      this.user.id = res['id'];
      this.user.image = res['image'];
      this.netImage = '../assets/upload-dir/' + this.user.id + '/' + this.user.image;
      console.log(this.user);
      }).catch(err => {
      console.error(err);
    });


  }

  ngOnDestroy() {
    this._routeSubscription.unsubscribe();
  }
}
