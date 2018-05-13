import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../guards/authentication.service';
import { AlertService } from '../directives/alert.service';
declare var jquery: any;
declare var $: any;

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],
    selector: 'app-login'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      //   $('.ui.form').form({
      //     fields: {
      //       username: {
      //         identifier  : 'username',
      //         rules: [
      //           {
      //             type   : 'empty',
      //             prompt : 'Please enter your username'
      //           }
      //         ]
      //       },
      //       password: {
      //         identifier  : 'password',
      //         rules: [
      //           {
      //             type   : 'empty',
      //             prompt : 'Please enter your password'
      //           },
      //           {
      //             type   : 'length[6]',
      //             prompt : 'Your password must be at least 6 characters'
      //           }
      //         ]
      //       }
      //     }
      //   })
      // ;
    }

    login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  sessionStorage.setItem('id', data.id);
                  localStorage.setItem('currentUser1', JSON.stringify(data));
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }
}
