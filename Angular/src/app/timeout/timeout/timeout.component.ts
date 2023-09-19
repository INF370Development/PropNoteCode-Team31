import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss']
})
export class TimeoutComponent implements OnInit {
  @ViewChild('hr') hr!: ElementRef;
  @ViewChild('mn') mn!: ElementRef;
  @ViewChild('sc') sc!: ElementRef;

  deg: number = 6;

  ngOnInit() {
    setInterval(() => {
      const day: Date = new Date();
      let hh: number = day.getHours() * this.deg;
      let mm: number = day.getMinutes() * this.deg;
      let ss: number = day.getSeconds() * this.deg;

      this.hr.nativeElement.style.transform = `rotateZ(${hh + mm / 12}deg)`;
      this.mn.nativeElement.style.transform = `rotateZ(${mm}deg)`;
      this.sc.nativeElement.style.transform = `rotateZ(${ss}deg)`;
    }, 1000);
  }
}
