import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DestinationInfoService } from './destination-info.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user';
import { CustomComment } from '../custom-comment';
import { Destination } from '../destination';

@Component({
  selector: 'app-destination-info',
  templateUrl: './destination-info.component.html',
  providers: [DestinationInfoService],
  styleUrls: ['./destination-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DestinationInfoComponent implements OnInit {
  name: String;
  sub: any;
  imgs: String[] = [];
  comments: String[] = [];
  owner: User = new User();
  destination: Destination = new Destination();
  model: CustomComment = new CustomComment();

  constructor(
    private destinationInfoService: DestinationInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.name = data['name'];
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.owner.username = currentUser.username;

    this.destinationInfoService.getDestinationInfo(this.name).subscribe(
      (res: any) => {
        this.sub = res;
      },
      err => {
        console.error(err);
      }
    );

    this.destinationInfoService.getDestinationImgs(this.name).subscribe(
      (res: any) => {
        for (const img of res) {
          this.imgs.push('../assets/upload-dir/' + this.name + '/' + img);
        }
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
