import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from './authentication/authGuardService/authService';

imports: [MatIconModule, MatButtonModule, MatMenuModule, MatSidenav];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PropNote';

  openSidebar: boolean = true;
  HasLoggedIn: boolean = false;
  userAccessType: string | null = '';
  AdminAccess: boolean = false;

  constructor(private router: Router, private _authService: AuthService) {}
  ngOnInit() {
    this.userAccessType = localStorage.getItem('userAccessType');
    if (this.userAccessType == 'Admin') {
      this.AdminAccess = true;
    }
    const token = localStorage.getItem('Token');
    if (token) {
      this.HasLoggedIn = true;
    } else {
      this.HasLoggedIn = false;
    }
  }

  get isLoggedIn(): boolean {
    var result = this._authService.isAuthenticated();
    return result;
  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle('showMenu');
  }

  onClickHome() {
    this.router.navigate(['/home']);
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
