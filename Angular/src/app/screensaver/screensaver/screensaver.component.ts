import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Timer } from 'node:timers';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.scss']
})
export class ScreensaverComponent {
  /*constructor(private router: Router, private userActivityService: UserActivityService) { }} 

  currentTime: string = '';
  currentDate: string = '';

  ngOnInit() {
    this.userActivityService.activityDetected.subscribe(() => {
      this.router.navigate(['/login']);
    });

    this.userActivityService.startInactivityTimer(120000);

    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
      this.currentDate = now.toLocaleDateString();
    }, 1000);

    const screensaver = document.querySelector('.body');
    screensaver?.addEventListener('click', () => {
      this.userActivityService.resetActivityTimer();
      this.router.navigate(['/login']);
    });
  }*/
}
 /*isScreensaverActive = false;
  ngOnInit() {
    setTimeout(() => {
      this.isScreensaverActive = true;
    }, 2 * 60 * 1000);
  }*/

//Javascript 
/* window.setInterval(ut, 1000);
function ut()b {
  var d = new Date();
  document.getElementbyId("time").innerHTML = d.toLocalTimeString();
  document.getElementbyId("date").innerHTML = d.toLocalDateString();
}*/