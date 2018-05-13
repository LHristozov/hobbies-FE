import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { AlertService } from '../directives/alert.service';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    selector: 'app-register',
    styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private location: Location,
        private userService: UserService,
        private alertService: AlertService) { }


    register() {
        this.loading = true;
        this.userService.create(this.model).then(res => {
                    this.alertService.success('Registration successful', true);
                    this.location.back();
                }).catch(err => {
                  console.error(err);
                  this.alertService.error(err);
                  this.loading = false;
                });
    }
}
