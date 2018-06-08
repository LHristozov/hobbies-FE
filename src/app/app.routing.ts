import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { EventsComponent } from './events/events.component';
import { NewEventComponent } from './new-event/new-event.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { NewDestinationComponent } from './new-destination/new-destination.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GlobalChatComponent } from './global-chat/global-chat.component';
import { DestinationInfoComponent } from './destination-info/destination-info.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MessagesComponent } from './messages/messages.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
      children: [
          { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
          { path: 'destinations', component: DestinationsComponent, canActivate: [AuthGuard] },
          { path: 'destinations/new-destination', component: NewDestinationComponent, canActivate: [AuthGuard] },
          { path: 'events/new-event', component: NewEventComponent, canActivate: [AuthGuard] },
          { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
          { path: 'global-chat', component: GlobalChatComponent, canActivate: [AuthGuard] },
          { path: 'destinations/:name', component: DestinationInfoComponent, canActivate: [AuthGuard] },
          { path: 'events/:name', component: EventInfoComponent, canActivate: [AuthGuard] },
          { path: 'user-info/:name', component: UserInfoComponent, canActivate: [AuthGuard] },
          { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }
      ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home/events' }
];

export const routing = RouterModule.forRoot(appRoutes);
