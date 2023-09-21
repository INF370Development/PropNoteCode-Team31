import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  iconStates: { [key: string]: string } = {};

  constructor(private router: Router) {}

  public Logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  onIconMouseOver(iconName: string, newState: string) {
    this.iconStates[iconName] = newState;
  }

  onIconMouseLeave(iconName: string) {
    this.iconStates[iconName] = '';
  }

}
