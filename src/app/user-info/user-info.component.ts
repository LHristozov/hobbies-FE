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
import { EventsService } from '../events/events.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  providers: [UserInfoService, UserProfileService, EventsService],
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  name: String;
  user: any = [];
  netImage: any = '';
  hasImage: any = false;
  usersName: String = '';
  isOwnProfile: Boolean = false;
  userEvents: any = [];
  nextEvent: any = [];
  isVisible: Boolean = false;
  interests: any = [];


  private _routeSubscription: Subscription = new Subscription();

  constructor(
    private eventInfoService: UserInfoService,
    private userProfileService: UserProfileService,
    private eventsService: EventsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._routeSubscription = this.route.params.subscribe(data => {
      this.name = data['name'];
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = currentUser.username;

    if (this.name === username) {
      this.isOwnProfile = true;
    }

   

    this.userProfileService.getUserByUsername(this.name).then(res => {
      console.log(`Result ${res}`);
      console.log(res['firstname']);
      this.user = res;
      if (this.user.image != null) {
        this.hasImage = true;
      } 
      
      if ((this.user.firstname).length > 0 && (this.user.lastname).length > 0 ) {
        this.usersName = this.user.firstname + ' ' + this.user.lastname;
      } else {
        this.usersName = this.user.username;
      }

      if (this.isOwnProfile === true || (this.user.userInfo.status).length > 0){
        this.isVisible = true;
      }

      this.interests = this.user.userInfo.interests.split(',')


      this.eventsService.getNextEventByUser(this.name).subscribe(
        (resss: any) => {
           resss.destination.netImage = '../assets/upload-dir/' + resss.destination.name + '/' + '1.jpg';

          this.nextEvent = resss;
        },
        err => {
          console.error(err);
        }
      );

      this.eventsService.getUserEvents(this.name).subscribe(
        (ress: any) => {
          for (const event of ress){
            event.destination.netImage = '../assets/upload-dir/' + event.destination.name + '/' + '1.jpg';
          }

          this.userEvents = ress;
        },
        err => {
          console.error(err);
        }
      );

      // this.user.firstname = res['firstname'];
      // this.user.lastname = res['lastname'];
      // this.user.username = res['username'];
      // this.user.email = res['email'];
      // this.user.id = res['id'];
      this.user.image = res['image'];
      debugger;
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
