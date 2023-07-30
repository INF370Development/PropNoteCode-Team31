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
  //Declare variables



  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  LoginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public Login()
  {
    var formData: LoginCredentials = new LoginCredentials();
    if(this.LoginForm.get('userName')?.value != null && this.LoginForm.get('password')?.value != null)
    {
      formData.Username = this.LoginForm.get('userName')?.value,
      formData.Password = this.LoginForm.get('password')?.value;
    }
    else
    {
      //TODO Return error message
      return
    }
    this.userService.Login(formData).subscribe((result: any) => {
      console.log(result);
      debugger;
      if (result.isSuccess == true) {
        this.router.navigate(['/home']);
        localStorage.setItem('Token', "AbCdEf123456");
        console.log(result);
      }
    });
    var user = new LoginCredentials();
    this.userService.Login(user)
  }
}
