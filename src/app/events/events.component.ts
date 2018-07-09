import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventsService } from './events.service';
import { Event } from '@angular/router/src/events';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  providers: [EventsService],
  styleUrls: ['events.component.css']
})
export class EventsComponent implements OnInit {
    events: any;
    netImage: any = '';
    moment = moment;
    recommendedEvents: any;
    username: any = '';

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
      console.log('On Init');
      // this.eventsService.getAllEvents().then(res => {
      //     console.log(`Result ${res}`);
      //     this.events = res;
      // }).catch(err => {
      //     console.error(err);
      // });

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.username = currentUser.username;

      this.eventsService.getAllEvents().then( (res: any) => {
        for (let event of res){
          event.destination.netImage = '../assets/upload-dir/' + event.destination.name + '/' + '1.jpg';
        }
        this.events = res;
      }).catch(err => {
        console.error(err);
      });

      debugger;

      this.eventsService.getRecommended(this.username).subscribe(
        (ress: any) => {
          ress.destination.netImage = '../assets/upload-dir/' + ress.destination.name + '/' + '1.jpg';
          this.recommendedEvents = ress;
        },
        err => {
          console.error(err);
        }
      );



  }

}
