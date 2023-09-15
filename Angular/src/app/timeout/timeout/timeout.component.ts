import { Component } from '@angular/core';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss']
})
export class TimeoutComponent {
  /*const deg = 6
  const hr = document.querySelector('#hr')
  const mn = document.querySelector('#mn')
  const sc = document.querySelector('#sc')

  setInterval(() =>{
    const day = new Date()
    let hh = day.getHours() * 30
    let mm = day.getMinutes() * deg 
    let ss = day.getSeconds() * deg 

    hr.style.transform = 'rotateZ(${hh + mm/12}deg)'
    mn.style.transform = 'rotateZ(${mm}deg)'
    sc.style.transform = 'rotateZ(${ss}deg)'
  })*/

  deg: number = 6;
  hr: HTMLElement | null;
  mn: HTMLElement | null;
  sc: HTMLElement | null;

  constructor() {
    this.hr = document.querySelector('#hr');
    this.mn = document.querySelector('#mn');
    this.sc = document.querySelector('#sc');
  }

  ngOnInit() {
    if (this.hr && this.mn && this.sc) {
      setInterval(() => {
        const day: Date = new Date();
        let hh: number = day.getHours() * this.deg;
        let mm: number = day.getMinutes() * this.deg;
        let ss: number = day.getSeconds() * this.deg;

        this.hr!.style.transform = `rotateZ(${hh + mm / 12}deg)`;
        this.mn!.style.transform = `rotateZ(${mm}deg)`;
        this.sc!.style.transform = `rotateZ(${ss}deg)`;
      }, 1000); 
    }
  }
}
