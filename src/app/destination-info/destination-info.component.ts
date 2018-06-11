import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DestinationInfoService } from './destination-info.service';
import { NewDestinationService } from '../new-destination/new-destination.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user';
import { CustomComment } from '../custom-comment';
import { Destination } from '../destination';
import { debug } from 'util';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-destination-info',
  templateUrl: './destination-info.component.html',
  providers: [DestinationInfoService, NewDestinationService],
  styleUrls: ['./destination-info.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class DestinationInfoComponent implements OnInit {
  name: String;
  sub: any;
  imgs: String[] = [];
  comments: String[] = [];
  owner: User = new User();
  currentImg: any = "";
  destination: Destination = new Destination();
  model: CustomComment = new CustomComment();

  // selectedFiles: FileList;
  // currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  uploadedFiles: any[] = [];

  lat: any;
  lng: any;
  zoom = 10;
  loading = false;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(
    private destinationInfoService: DestinationInfoService,
    private route: ActivatedRoute,
    private newDestinationService: NewDestinationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.name = data['name'];
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.owner.username = currentUser.username;

    this.destinationInfoService.getDestinationInfo(this.name).subscribe(
      (res: any) => {
        this.sub = res;
        // debugger;
        this.lat = Number(this.sub.lat);
        this.lng = Number(this.sub.lon);



      },
      err => {
        console.error(err);
      }
    );

    this.destinationInfoService.getDestinationImgs(this.name).subscribe(
      (res: any) => {
        // debugger;
        for (const img of res) {
          this.imgs.push('../assets/upload-dir/' + this.name + '/' + img);
        }
        this.currentImg = this.imgs[0];
        this.setPage(1);
      },
      err => {
        console.error(err);
      }
    );

    this.destinationInfoService.getDestinationComments(this.name).subscribe(
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

  saveDestinationComment(comment) {
    this.model.user_id = this.owner;
    this.destination.name = this.name;
    this.model.destination_id = this.destination;
    this.model.text = comment;
    console.log(this.model);
    this.destinationInfoService.saveDestinationComment(this.model).subscribe(
      (res: any) => {

        this.destinationInfoService.getDestinationComments(this.name).subscribe(
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

  currentImgChange(imgUrl) {

    this.currentImg = imgUrl;
  }



  setPage(page: number) {

    // get pager object from service
    this.pager = this.getPager(this.imgs.length, page, 4);

    // get current page of items
    this.pagedItems = this.imgs.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }




  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 4) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  upload(event) {
    this.progress.percentage = 0;
    for (const file of event.files) {
      this.uploadedFiles.push(file);

      // this.userProfileService.pushFileToStorage(file, this.user.id)
      this.newDestinationService.pushFileToStorage(file, this.sub.name)
        .then(res => {
          debugger;
          console.log(res);
        }).catch(err => {
          console.error(err);
        });


    }
  }

  // upload() {

  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   debugger;
  //   this.newDestinationService.pushFileToStorage(this.currentFileUpload, "this.model.name")
  //   .then(res => {
  //     debugger;
  //     console.log(res);
  //     }).catch(err => {
  //     console.error(err);
  //   });

  //   this.selectedFiles = undefined;
  // }







}
