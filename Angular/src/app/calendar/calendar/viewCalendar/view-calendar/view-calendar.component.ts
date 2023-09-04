import { Component } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
})
export class ViewCalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    themeSystem: 'bootstrap',
    events: [
      {
        title: 'Iteration 7 Review',
        start: '2023-09-11', // Event start date
        end: '2023-09-11',    // Event end date
        color: 'red',
      },
      {
        title: 'Taking a break',
        start: '2023-09-15',
        end: '2023-09-20',
        color : 'green'
      },
    ]
  };
}


