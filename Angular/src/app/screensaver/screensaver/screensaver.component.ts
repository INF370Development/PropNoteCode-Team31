import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.scss']
})
export class ScreensaverComponent implements OnInit{
  currentTime: string = '';
  currentDate: string = '';

  ngOnInit() {
    // Start the timer to update time and date every second
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
      this.currentDate = now.toLocaleDateString();
    }, 1000);
  }
}

//Javascript 
/* window.setInterval(ut, 1000);
function ut()b {
  var d = new Date();
  document.getElementbyId("time").innerHTML = d.toLocalTimeString();
  document.getElementbyId("date").innerHTML = d.toLocalDateString();
}*/