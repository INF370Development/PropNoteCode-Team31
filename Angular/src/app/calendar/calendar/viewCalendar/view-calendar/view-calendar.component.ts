import { Component, OnInit } from '@angular/core';

declare var gapi: any;

import 'gapi.client.calendar';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss']
})
export class ViewCalendarComponent implements OnInit{
  private CLIENT_ID = '816728681069-sn07par3bmtfhhf00naiorndvf1u18bs.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyCu7TXNrUoKhUZR3joL725_q6YeHF-Jlo4';

  calendarEvents: gapi.client.calendar.Event[] = [];

  // ... Other properties and methods ...

  ngOnInit(): void {
    gapi.load('client', this.initClient.bind(this));
  }

  initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyCu7TXNrUoKhUZR3joL725_q6YeHF-Jlo4',
      clientId: '816728681069-sn07par3bmtfhhf00naiorndvf1u18bs.apps.googleusercontent.comD',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    }).then(() => {
      this.fetchCalendarEvents();
    });
  }

  fetchCalendarEvents() {
    // Use gapi.client to fetch Google Calendar events
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    }).then((response: gapi.client.calendar.Event) => {
      this.calendarEvents = response.result.items;
    });
  }
}