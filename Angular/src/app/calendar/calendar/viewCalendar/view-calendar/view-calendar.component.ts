import { ChangeDetectorRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { addDays, addMinutes, endOfWeek } from 'date-fns';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}


function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})

export class ViewCalendarComponent implements OnInit {
  viewDate = new Date();
  weekStartsOn: 0 = 0;
  dragToCreateActive = false;
  events: CalendarEvent[] = [];
  days: any[] = [];
  slots: any[] = [];
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initDays();
  }

  initDays() {
    this.days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    for (let i = 0; i < this.days.length; i++) {
      let a = { day: this.days[i], time: [] };
      this.slots.push(a);
    }
  }

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New slot',
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
      actions: [
        {
          label: '',
          onClick: ({ event }: { event?: CalendarEvent }): void => {
            if (event) {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              this.removeSlot(event);
            }
          },
        }
      ]      
    };
    this.events = [...this.events, dragToSelectEvent];

    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
    this.getSlots();
  }

  convertTime(t: Date): string {
    return t.toTimeString();
  }
  
  convertDay(d: Date): string {
    return d.toLocaleString('en-us', {
      weekday: 'long',
    });
  }

  getSlots() {
    this.slots.map((day, i) => {
      this.slots[i].time = [];
      this.events.forEach((e) => {
        if (day.day == this.convertDay(e.start)) {
          this.slots[i].time.push({
            startTime: e.start,
            endTime: e.end,
            id: e.id,
          });
        }
      });
    });
  }

  removeSlot(event: CalendarEvent<any>) {
    const id = event.id as number; 
    for (let j = 0; j < this.slots.length; j++) {
      this.slots[j].time = this.slots[j].time.filter((t: { id: number }) => t.id !== id);
    }
  }
}

  /*currentMonth: Date = new Date();
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
  }*/


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