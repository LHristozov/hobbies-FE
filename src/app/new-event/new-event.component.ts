import { Component } from '@angular/core';
import { NewEventService } from './new-event.service';
import { Destination } from '../destination';
import { Location } from '@angular/common';
import { MouseEvent } from '@agm/core';
import { Event } from '../event';
import { User } from '../user/user';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DestinationInfoService } from '../destination-info/destination-info.service';
import { MeetingPoint } from '../meeting-point';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  providers: [ NewEventService, DestinationInfoService ],
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  model: Event = new Event();
  owner: User = new User();
  destinations: Destination[] =  [];
  categories: any[] =  [];
  meetingPoint: MeetingPoint = new MeetingPoint();

  lat = 42.14360940298495;
  lng = 24.74711301840921;
  zoom = 8;
  markers: Marker[] = [ ];
  loading = false;



  constructor(private newEventService: NewEventService,
              private destinationInfoService: DestinationInfoService ,
              private location: Location) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.owner.username = currentUser.username;
    this.destinationInfoService.getDestinations()
      .subscribe((res: any) => {
        this.destinations = res;
      },
      (err) => {
        console.error(err);
      });

      this.newEventService.getAllCategories().then( (res: any) => {
        this.categories =  res;
      }).catch(err => {
        console.error(err);
      });

      this.meetingPoint.lat = this.lat;
      this.meetingPoint.lon = this.lng;

  }


  onSubmit() {
    this.model.owner = this.owner;

    this.model.meetingPoint = this.meetingPoint;

    // console.log(this.meetingPoint);
  //  console.log(this.model);
    this.newEventService.createNewEvent(this.model).then(res => {
    this.location.back();
    }).catch(err => {
      console.error(err);
    });
  }



  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }


  // google maps methods
  mapClicked($event: MouseEvent) {
    if (this.markers.length === 1) {
      this.markers.pop();
    }
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    });

    this.lat = this.markers[0].lat;
    this.lng = this.markers[0].lng;
    this.meetingPoint.lat = this.lat;
    this.meetingPoint.lon = this.lng;
  }

  // ne raboti TODO
  markerDragEnd(m: Marker, $event: MouseEvent) {
    this.meetingPoint.lat = this.markers[0].lat;
    this.meetingPoint.lon = this.markers[0].lng;
    console.log('dragEnd', m, $event);
  }


}


interface Marker {
  lat: number;
  lng: number;
  label?: string;
 draggable: boolean;
}



