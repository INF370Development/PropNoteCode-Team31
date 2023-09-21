import { Component, OnInit } from '@angular/core';
/*import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';*/

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
})
export class ViewCalendarComponent implements OnInit {

  currentMonth: Date = new Date();
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
  }

  prevMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.weeks = []; 

    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

    let currentDate = new Date(firstDayOfMonth);

    while (currentDate <= lastDayOfMonth) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(currentDate.getDate());
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }
}

  /*calendarOptions: CalendarOptions = {
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
  };*/