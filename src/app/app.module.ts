import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SuiModule } from 'ng2-semantic-ui';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { NewDestinationComponent } from './new-destination/new-destination.component';
import { DestinationInfoComponent } from './destination-info/destination-info.component';
import { UserInfoComponent } from './user-info/user-info.component';

// used to create fake backend
import { fakeBackendProvider } from './fake-backend';

import { routing } from './app.routing';

import { AlertComponent } from './directives/alert.component';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './jwt.interceptor';
import { UserService } from './user/user.service';
import { AlertService } from './directives/alert.service';
import { AuthenticationService } from './guards/authentication.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { DetailsUploadComponent } from './upload/details-upload/details-upload.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';
import { UploadFileService } from './upload/upload-file.service';
import { GlobalChatComponent } from './global-chat/global-chat.component';
import { MessagesComponent } from './messages/messages.component';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    NewEventComponent,
    EventInfoComponent,
    UserInfoComponent,
    DestinationsComponent,
    NewDestinationComponent,
    DestinationInfoComponent,
    MessagesComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    WrapperComponent,
    UserProfileComponent,
    GlobalChatComponent,
    DetailsUploadComponent,
    FormUploadComponent,
    ListUploadComponent
  ],
  imports: [
    BrowserModule,
    SuiModule,
    routing,
    ScrollPanelModule,
    ButtonModule,
    FormsModule,
    AutoCompleteModule,
    FileUploadModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_7n6H1oClDLm-rYpFsH7PIN0NJgDIwrM'
    })
  ],
  providers: [
    AuthGuard,
    AlertService,
    UploadFileService,
    AuthenticationService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
