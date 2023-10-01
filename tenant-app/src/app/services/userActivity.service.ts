import { Injectable, EventEmitter } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserActivity {
  private inactivityTimeout = 120000;
  private inactivityTimer: any;
  public inactivityDetected: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.initInactivityTimer();
  }

  private initInactivityTimer() {
    fromEvent(document, 'mousemove')
      .pipe(debounceTime(1000))
      .subscribe(() => this.resetInactivityTimer());

    fromEvent(document, 'keydown')
      .pipe(debounceTime(1000))
      .subscribe(() => this.resetInactivityTimer());

    this.resetInactivityTimer();
  }

  private resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      this.inactivityDetected.emit();
    }, this.inactivityTimeout);
  }
}