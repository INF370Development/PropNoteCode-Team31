import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserActivity } from 'src/app/services/userActivity.service';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.scss']
})

export class ScreensaverComponent implements OnInit {
  currentTime: string = '';
  currentDate: string = '';
  loadingPageActive: boolean = false;

  constructor(private router: Router, private userActivity: UserActivity) {}

  ngOnInit(): void {
    this.updateTimeAndDate();
    setInterval(() => this.updateTimeAndDate(), 1000);

    this.userActivity.inactivityDetected.subscribe(() => {
      this.activateLoadingPage();
      console.log('User inactive for 2 minutes');
    });
  }

  updateTimeAndDate() {
    const d = new Date();
    this.currentTime = d.toLocaleTimeString();
    this.currentDate = d.toLocaleDateString();
  }

  activateLoadingPage() {
    this.loadingPageActive = true;

    setTimeout(() => {
      this.loadingPageActive = false;
      this.logout();
    }, 5000); // Adjust the timeout as needed
  }

  logout() {
    // Perform your logout logic here
    console.log('Logout logic executed');
    this.router.navigate(['/login']);
  }
}


//Javascript 
/* window.setInterval(ut, 1000);
function ut()b {
  var d = new Date();
  document.getElementbyId("time").innerHTML = d.toLocalTimeString();
  document.getElementbyId("date").innerHTML = d.toLocalDateString();
}*/