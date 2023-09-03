import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  title = 'PropNote';

  openSidebar: boolean = true;

  ngOnInit() {

  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }


  constructor(private router: Router) { }

  onClickHome() {
    this.router.navigate(['/home']);
  }

  onClickChat() {
    this.router.navigate(['/chatbot']);
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  toggleSidenav() {
    this.sidenav.toggle();
  }

}

