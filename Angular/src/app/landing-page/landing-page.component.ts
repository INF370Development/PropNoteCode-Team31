import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor(private _router: Router) {}

  Login() {
    //TODO - Will Need to redirect back to Landing Page
    this._router.navigate(['/login']);
  }
}
