import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { EventsService } from '../events/events.service';
import { Event } from '../event';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    selector: 'app-home',
    styleUrls: ['./home.component.css'],
    providers: [EventsService]
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    eventss = ['event1', 'event2' ];
    event: Event = new Event();
    events: Event[] = [];
    filteredEventsSingle: any[];
    query: any;
    asd: any;

    constructor(private userService: UserService,
                private eventsService: EventsService,
                private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    goToSelected(event) {
       this.asd =  event.name;
       this.router.navigate(['home/events/' + event.name]);
       this.event = null;
    }

    filterEventsSingle(event) {
      this.query = event.query;
      this.eventsService.getAllEvents().then( (res: any) => {
        this.filteredEventsSingle = this.filterEvents(this.query, res);
      }).catch(err => {
        console.error(err);
      });
  }

  filterEvents(query, events: Event[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < events.length; i++) {
        const event: Event = events[i];
        if (event.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push(event);
        }
    }
    return filtered;
}




    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
