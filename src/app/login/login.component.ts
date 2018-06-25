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
