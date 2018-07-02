import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { EventsService } from '../events/events.service';
import { Event } from '../event';
import { Destination } from '../destination';
import { DestinationsService } from '../destinations/destinations.service';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    selector: 'app-home',
    styleUrls: ['./home.component.css'],
    providers: [EventsService, DestinationsService]
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    eventss = ['event1', 'event2' ];
    event: Event = new Event();
    destination: Destination = new Destination();
    user: User = new User();
    events: Event[] = [];
    filteredEventsSingle: any[];
    filteredDestinationsSingle: any[];
    filteredUsersSingle: any[];
    query: any;
    asd: any;
    searchCriteria: any = 'event';

    constructor(private userService: UserService,
                private eventsService: EventsService,
                private router: Router,
                private destinationsService: DestinationsService
              ) {

    }

    ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loadAllUsers();
    }

    goToSelectedEvent(event) {
       this.asd =  event.name;
       this.router.navigate(['home/events/' + event.name]);
       this.event = null;
    }
    goToSelectedDestination(destination) {
      this.asd =  destination.name;
      this.router.navigate(['home/destinations/' + destination.name]);
      this.destination = null;
   }
   goToSelectedUser(user) {
    this.asd =  user.username;
    this.router.navigate(['home/user-info/' + user.username]);
    this.user = null;
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

  filterDestinationSingle(event) {
    this.query = event.query;
    this.destinationsService.getAllDestinations().then( (res: any) => {
      this.filteredDestinationsSingle = this.filterDestination(this.query, res);
    }).catch(err => {
      console.error(err);
    });
  }

filterDestination(query, destinations: Destination[]): any[] {
  // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  const filtered: any[] = [];
  for (let i = 0; i < destinations.length; i++) {
      const destination: Destination = destinations[i];
      if (destination.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filtered.push(destination);
      }
  }
  return filtered;
}

filterUserSingle(event) {
  this.query = event.query;
  this.userService.getAllUsers().then( (res: any) => {
    this.filteredUsersSingle = this.filterUser(this.query, res);
  }).catch(err => {
    console.error(err);
  });
}

filterUser(query, users: User[]): any[] {
// in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
const filtered: any[] = [];
for (let i = 0; i < users.length; i++) {
    const user: User = users[i];
    if (user.username.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(user);
    }
}
return filtered;
}


  changeSearchCriteria(criteria: String) {
    this.searchCriteria = criteria;
  }



    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
