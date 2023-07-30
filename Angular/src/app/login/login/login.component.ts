import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/models/LoginCredentials';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {



  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  LoginForm = new FormGroup({
    LoginInput: new FormControl('', Validators.required),
    Passwordinput: new FormControl('', Validators.required),
  });

  public Login()
  {
    var formData: LoginCredentials = new LoginCredentials();
    (formData.username = this.LoginForm.get('UserName')?.value),
      (formData.password = this.LoginForm.get('Password')?.value);

    this.userService.Login(formData).subscribe((result: any) => {
      console.log(result);
      if (result.statusCode == 201) {
        localStorage.setItem('Token', JSON.stringify(result));
        console.log(result);
      }
    });
    var user = new LoginCredentials();
    this.userService.Login(user)
  }
}
