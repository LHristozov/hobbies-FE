import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { User } from '../user/user';
import { Location } from '@angular/common';
import { AlertService } from '../directives/alert.service';
import { UserService } from '../user/user.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Message } from 'primeng/components/common/message';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  providers: [ UserProfileService, UserService ],
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  user: any = [];
  loading = false;
  netImage: any = '';
  userInfo: any = [];
  hasImage: any = false;
  msgs: Message[];
  uploadedFiles: any[] = [];
  birthDate: any;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  str: any;

  constructor(
    private userProfileService: UserProfileService,
    private location: Location,
    private alertService: AlertService,
    private userService: UserService
    ) { }

   ngOnInit() {
    console.log('On Init');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = currentUser.username;

    this.userProfileService.getUserByUsername(username).then(res => {
      console.log(`Result ${res}`);
      this.user = res;

      // this.userInfo = res['userInfo'];
      // this.user.firstname = res['firstname'];
      // this.user.lastname = res['lastname'];
      // this.user.username = res['username'];
      // this.user.email = res['email'];
      // this.user.id = res['id'];
      // this.user.image = res['image'];
      if (this.user.image != null) {
        this.hasImage = true;
      }
      this.netImage = '../assets/upload-dir/' + this.user.id + '/' + this.user.image;
      console.log(this.user);
      }).catch(err => {
      console.error(err);
    });
   this.str = this.parseJwt(currentUser);
}

update() {
  this.loading = true;

  this.userService.update(this.user).then(res => {
              this.alertService.success('update successful', true);
           //   this.location.back();
          }).catch(err => {
            console.error(err);
            this.alertService.error(err);
            this.loading = false;
          });
}


upload(event) {
  this.progress.percentage = 0;
  for (const file of event.files) {
    this.uploadedFiles.push(file);

    this.userProfileService.pushFileToStorage(file, this.user.id)
    .then(res => {
      this.netImage = '../assets/upload-dir/' + this.user.id + '/' + this.user.image;
      console.log(res);
      }).catch(err => {
      console.error(err);
    });


  }


  this.msgs = [];
  this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});

  // this.currentFileUpload = this.selectedFiles.item(0);
  // this.userProfileService.pushFileToStorage(this.currentFileUpload, this.user.id)
  // .then(res => {
  //   this.netImage = '../assets/upload-dir/' + this.user.id + '/' + this.user.image;
  //   console.log(res);
  //   }).catch(err => {
  //   console.error(err);
  // });

  // this.selectedFiles = undefined;
}

onUpload(event) {

}


selectFile(event) {
  const file = event.target.files.item(0);


  if (file.type.match('image.*')) {
    this.selectedFiles = event.target.files;
  } else {
    alert('invalid format!');
  }

}

parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

}
