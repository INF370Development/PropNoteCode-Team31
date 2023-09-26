import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.scss']
})
export class ScreensaverComponent implements OnInit {
  currentTime: string = "";
  currentDate: string = "";
  loadingPageActive: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateTimeAndDate();
    window.setInterval(() => this.updateTimeAndDate(), 1000);
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
      this.router.navigate(['/landingPage']);
    }, 3000); 
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/landingPage']).then(() => {
      location.reload();
    });
  }
}

//Javascript 
/* window.setInterval(ut, 1000);
function ut()b {
  var d = new Date();
  document.getElementbyId("time").innerHTML = d.toLocalTimeString();
  document.getElementbyId("date").innerHTML = d.toLocalDateString();
}*/