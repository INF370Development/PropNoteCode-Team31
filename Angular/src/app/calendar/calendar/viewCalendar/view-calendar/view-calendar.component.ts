import { HttpClient } from '@angular/common/http';
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
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
  providers: [DayService, WorkWeekService, MonthService],
})
export class ViewCalendarComponent {
  public dataManager: DataManager = new DataManager({
    url: 'https://localhost:7251/api/Calendar/GetLoadData', // 'controller/actions'
    crudUrl: 'Home/UpdateData',
    adaptor: new UrlAdaptor(),
  });
  public selectedDate: Date = new Date(2023, 0, 1);
  public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
}
