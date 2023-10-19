import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class GoogleCalendarService {
  private initialized = false;

  initClient(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.initialized) {
        console.log('Google API client is already initialized.');
        resolve();
      } else {
        gapi.load('client:auth2', () => {
          gapi.client.init({
            apiKey: 'AIzaSyBMcHG17LPp9mx85zaeYtyUP8tsa3pbQGM',
            clientId: '295022578538-6rcmf4obfo4pp7dsbrorhklceiq9d2rn.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: 'https://www.googleapis.com/auth/calendar',
          }).then(() => {
            this.initialized = true;
            console.log('Google API client initialized successfully.');
            resolve();
          })
        });
      }
    });
  }

  listEvents(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then((response: any) => { // Specify type as 'any' or more specific type if available
        const events = response.result.items;
        resolve(events);
      }, (error: any) => { // Specify type as 'any' or more specific type if available
        reject(error);
      });
    });
  }
}