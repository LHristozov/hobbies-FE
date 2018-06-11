import { Component } from '@angular/core';
import { NewDestinationService } from './new-destination.service';
import { Destination } from '../destination';
import { Location } from '@angular/common';
import { MouseEvent } from '@agm/core';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-new-destination',
  templateUrl: './new-destination.component.html',
  providers: [ NewDestinationService ],
  styleUrls: ['./new-destination.component.css']
})
export class NewDestinationComponent {
  events: any;
  model: Destination = new Destination();
  title = 'Select Destination Location';
  lat = 42.140774947466454;
  lng = 24.74435693729356;
  zoom = 8;
  markers: Marker[] = [ ];
  loading = false;
  netImage: any = '';
  show: any = false;
  msgs: Message[];

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  uploadedFiles: any[] = [];

  constructor(private newDestinationService: NewDestinationService, private location: Location) { }

  onSubmit() {
    this.newDestinationService.createNewDestination(this.model).then(res => {
      this.location.back();
    }).catch(err => {
      console.error(err);
    });
  }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

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
    this.model.lat = this.lat;
    this.model.lon = this.lng;
  }

  // ne raboti TODO
  markerDragEnd(m: Marker, $event: MouseEvent) {
    this.model.lat = this.markers[0].lat;
    this.model.lon = this.markers[0].lng;
    console.log('dragEnd', m, $event);
  }



  upload(event) {
    this.progress.percentage = 0;
    for (const file of event.files) {
      this.uploadedFiles.push(file);

      // this.userProfileService.pushFileToStorage(file, this.user.id)
      this.newDestinationService.pushFileToStorage(file, this.model.name)
        .then(res => {
          debugger;
          
  
          this.msgs = [];
          this.msgs.push({severity: 'info', summary: 'Success', detail: 'File Uploaded'});

          this.netImage = '../assets/upload-dir/' + this.model.name + '/' + '_1';
          this.show = true;
          console.log(res);
        }).catch(err => {
          console.error(err);
        });


    }
  }


// upload() {
//   this.progress.percentage = 0;

//   this.currentFileUpload = this.selectedFiles.item(0);
//   this.newDestinationService.pushFileToStorage(this.currentFileUpload, this.model.name)
//   .then(res => {
//     this.netImage = '../assets/upload-dir/' + this.model.name + '/' + '_1';
//     console.log(res);
//     }).catch(err => {
//     console.error(err);
//   });

//   this.selectedFiles = undefined;
// }

selectFile(event) {
  const file = event.target.files.item(0);


  if (file.type.match('image.*')) {
    this.selectedFiles = event.target.files;
  } else {
    alert('invalid format!');
  }
}


}


interface Marker {
  lat: number;
  lng: number;
  label?: string;
 draggable: boolean;
}
