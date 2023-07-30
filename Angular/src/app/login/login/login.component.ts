import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/models/LoginCredentials';
import { UserService } from 'src/app/services/user.service';
import { LoginFailedComponent } from './login-failed/login-failed.component';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //Declare variables

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: Dialog
  ) {}

  LoginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public Login() {
    var formData: LoginCredentials = new LoginCredentials();
    if (
      this.LoginForm.get('userName')?.value != null &&
      this.LoginForm.get('password')?.value != null
    ) {
      (formData.Username = this.LoginForm.get('userName')?.value),
        (formData.Password = this.LoginForm.get('password')?.value);
    } else {
      //TODO Return error message
      return;
    }
    debugger
    this.userService.Login(formData).subscribe((result: any) => {
      if (result.isSuccess == true) {
        localStorage.setItem('userAccessType', 'Admin');
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      } else {
        this.openDialog();
      }
    });
    var user = new LoginCredentials();
    this.userService.Login(user);
  }
  openDialog(): void {
    this.dialog.open(LoginFailedComponent, {
      width: '500px',
    });
  }
}
