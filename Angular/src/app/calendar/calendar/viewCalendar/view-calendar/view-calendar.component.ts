import { Component, OnInit } from '@angular/core';
import { GoogleCalendarService } from 'src/app/calendar/google-calendar.service';
import { CalendarEventResponse } from 'src/app/calendar/calendarEventResponse';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss']
})
export class ViewCalendarComponent implements OnInit {
  public events: any[] = [];

  constructor(private googleCalendarService: GoogleCalendarService) {}

  ngOnInit(): void {
    this.googleCalendarService.initClient().then(() => {
      this.makeGoogleCalendarRequests();
    });
  }

  makeGoogleCalendarRequests() {
    this.googleCalendarService.listEvents().then(events => {
      this.events = events;
    });
  }
}

  /*constructor(private googleCalendarService: GoogleCalendarService) {}

  ngOnInit(): void {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyBMcHG17LPp9mx85zaeYtyUP8tsa3pbQGM',
        clientId: '295022578538-6rcmf4obfo4pp7dsbrorhklceiq9d2rn.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar',
      }).then(() => {
        this.makeGoogleCalendarRequests();
      });
    });
  }

  makeGoogleCalendarRequests() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then((response: CalendarEventResponse) => {
      const events = response.result.items;
      console.log('Calendar events:', events);
    });
  }
}*/