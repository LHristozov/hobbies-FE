import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { Event } from '@angular/router/src/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  providers: [EventsService]
})
export class EventsComponent implements OnInit {
    events: any;
    netImage: any = '';

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
      console.log('On Init');
      // this.eventsService.getAllEvents().then(res => {
      //     console.log(`Result ${res}`);
      //     this.events = res;
      // }).catch(err => {
      //     console.error(err);
      // });


      this.eventsService.getAllEvents().then( (res: any) => {
        for (let event of res){
          event.destination.netImage = '../assets/upload-dir/' + event.destination.name + '/' + '1.jpg';
        }
        this.events = res;
      }).catch(err => {
        console.error(err);
      });

  }

}
