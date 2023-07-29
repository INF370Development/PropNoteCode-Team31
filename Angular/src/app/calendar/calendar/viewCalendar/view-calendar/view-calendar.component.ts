import { Component, OnInit } from '@angular/core';
import {
  DayService,
  WorkWeekService,
  MonthService,
  EventSettingsModel,
  ScheduleComponent,
  WorkHoursModel,
  PopupOpenEventArgs,
  EventRenderedArgs,
} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
  providers: [DayService, WorkWeekService, MonthService],
})
export class ViewCalendarComponent {
  public selectedDate: Date = new Date(2023, 6, 31);
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Servicing of Aircon',
        StartTime: new Date(2023, 6, 31, 9, 30),
        EndTime: new Date(2023, 6, 31, 11, 0),
      },
      {
        Id: 2,
        Subject: 'Meeting with Broker',
        StartTime: new Date(2023, 7, 1, 12, 0),
        EndTime: new Date(2018, 7, 1, 14, 0),
      },
      {
        Id: 3,
        Subject: 'Maintenance on Roller Doors',
        StartTime: new Date(2023, 7, 3, 9, 30),
        EndTime: new Date(2023, 7, 3, 11, 0),
      },
      {
        Id: 4,
        Subject: 'Check up on Pinetown Building',
        StartTime: new Date(2023, 7, 4, 13, 0),
        EndTime: new Date(2023, 7, 4, 14, 30),
      },
    ],
  };
}
