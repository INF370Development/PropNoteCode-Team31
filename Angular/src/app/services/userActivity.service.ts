import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserActivity {
  private inactivityTimeout = 120000; // 2 minutes in milliseconds
  private inactivityTimer: any;
  public inactivityDetected: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.initInactivityTimer();
  }

  private initInactivityTimer() {
    window.addEventListener('mousemove', () => this.resetInactivityTimer());
    window.addEventListener('keydown', () => this.resetInactivityTimer());

    this.resetInactivityTimer();
  }

  private resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      this.inactivityDetected.emit();
    }, this.inactivityTimeout);
  }
}