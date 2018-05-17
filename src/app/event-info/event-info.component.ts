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
        this.destination = res.destination;

        // Event img is the first img from the destination
        this.eventInfoService.getEventImgs(this.destination.name).subscribe(
          (resu: any) => {
            this.imgs.push('../assets/upload-dir/' + this.destination.name + '/' + resu[0]);
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
            this.comments = ress;
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
}