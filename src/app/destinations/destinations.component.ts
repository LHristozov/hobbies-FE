import { Component, OnInit } from '@angular/core';
import { DestinationsService } from './destinations.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  providers: [DestinationsService]
}) 
export class DestinationsComponent implements OnInit  {
  destinations: any;
  netImage: any = '';

  constructor(private destinationsService: DestinationsService) { }

  ngOnInit(): void {
    this.destinationsService.getAllDestinations().then( (res: any) => {
      for (let destination of res){
        destination.netImage = '../assets/upload-dir/' + destination.name + '/' + '1.jpg';
      }
      this.destinations = res;
    }).catch(err => {
      console.error(err);
    });
  }
}
