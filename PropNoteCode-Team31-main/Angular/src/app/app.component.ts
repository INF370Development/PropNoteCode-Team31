import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

imports: [MatIconModule, MatButtonModule, MatMenuModule, MatSidenav];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PropNote';

  openSidebar: boolean = true;
  LoggedIn: boolean = false;
  userAccessType: string | null = '';
  AdminAccess: boolean = false;

  ngOnInit() {
    this.userAccessType = localStorage.getItem('userAccessType');
    if (this.userAccessType == 'Admin') {
      this.AdminAccess = true;
    }
  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle('showMenu');
  }

  constructor(private router: Router) {}

  onClickHome() {
    this.router.navigate(['/home']);
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
