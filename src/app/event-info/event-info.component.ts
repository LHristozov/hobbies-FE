import { Component, OnInit } from '@angular/core';
import { EventInfoService } from './event-info.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { DestinationsService } from '../destinations/destinations.service';
import { Destination } from '../destination';
import { User } from '../user/user';
import { CustomComment } from '../custom-comment';
import { Event } from '../event';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  providers: [EventInfoService],
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit, OnDestroy {
  name: String;
  event: Event;
  imgs: String[] = [];
  destination: Destination = new Destination();
  comments: String[] = [];
  participants: String [] = [];
  owner: User = new User();
  model: CustomComment = new CustomComment();
  lat: Number = 0;
  lng: Number = 0;
  zoom = 16;
  currentImg: any = "";
  isOwner: Boolean = false;

  private _routeSubscription: Subscription = new Subscription();

  constructor(
    private eventInfoService: EventInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._routeSubscription = this.route.params.subscribe(data => {
      this.name = data['name'];
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.owner.username = currentUser.username;

    this.eventInfoService.getEventInfo(this.name).subscribe(
      (res: any) => {
        this.event = res;
        debugger;
        this.lat = Number(res.meetingPoint.lat);
        this.lng = Number(res.meetingPoint.lon);
        if (this.owner.username === this.event.owner.username) {
          this.isOwner = true;
        }

        // Event img is the first img from the destination
        this.eventInfoService.getEventImgs(res.destination.name).subscribe(
          (resu: any) => {
            debugger;
            this.imgs.push('../assets/upload-dir/' + res.destination.name + '/' + resu[0]);
            this.currentImg = this.imgs[0];
          },
          err => {
            console.error(err);
          }
        );
      },
      err => {
        console.error(err);
      }
    );


    this.eventInfoService.getEventParticipants(this.name).subscribe(
      (res: any) => {
        for (const participant of res) {
          this.participants.push(participant);
        }
      },
      err => {
        console.error(err);
      }
    );

    this.eventInfoService.getEventComments(this.name).subscribe(
      (res: any) => {
        for (const comment of res) {
          this.comments.push(comment);
        }
        this.comments = this.comments.reverse();
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnDestroy() {
    this._routeSubscription.unsubscribe();
  }

  registerForEvent() {
    console.log('REGISTER FOR EVENT');
    this.event.owner = this.owner;
    this.eventInfoService.registerForEvent(this.event).subscribe(
      (res: any) => {

      },
      err => {
        console.error(err);
      }
    );
  }

  saveDestinationComment(comment) {
    this.model.user_id = this.owner;
    this.destination.name = this.name;
    this.model.event_id = this.event;
    this.model.text = comment;
    console.log(this.model);
    this.eventInfoService.saveEventComment(this.model).subscribe(
      (res: any) => {

        this.eventInfoService.getEventComments(this.name).subscribe(
          (ress: any) => {
            this.comments = ress.reverse();
          },
          err => {
            console.error(err);
          }
        );
      },
      err => {
        console.error(err);
      }
    );
  }

delete() {
  debugger;
  this.eventInfoService.deleteEvent(this.event).subscribe(
    (res: any) => {

    },
    err => {
      console.error(err);
    }
  );
}

  myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
    } else {
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className =
        x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
}

}
