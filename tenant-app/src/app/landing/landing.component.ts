import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Import NavController

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {

  constructor(private navCtrl: NavController) {}

  navigateToLogin() {
    // Navigate to another page (e.g., your home page)
    this.navCtrl.navigateForward('/login'); // Replace '/home' with your desired page route
  }
}
