import { Component } from '@angular/core';
import { User } from 'src/app/shared/UserModels/User';
import { RegisterUserModel } from '../models/User';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.scss'],
})
export class RegisterNewUserComponent {
  //Variables

  usermodel: RegisterUserModel = {
    Email: '',
    Name: '',
    Username: '',
    userRole: [],
  };
  public RegisterUser() {
    if (this.usermodel) {
      //Call EndPoint
    }
  }
}
