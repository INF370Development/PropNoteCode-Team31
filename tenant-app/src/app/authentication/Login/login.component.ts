import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/authentication/models/LoginCredentials';
import { UpdateProfileDetailsComponent } from '../UpdateProfileDetails/update-profile-details/update-profile-details.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //Declare variables
  LoginForm: FormGroup | any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialog: Dialog,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.LoginForm = this._formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public Login() {
    if (this.LoginForm.valid) {
      const formData = {
        Username: this.LoginForm.get('userName').value,
        Password: this.LoginForm.get('password').value,
      };
      let UserData = new LoginCredentials();
      UserData.username = formData.Username;
      UserData.password = formData.Password;
      this.authenticationService.Login(UserData).subscribe((result: any) => {
        if (result.isSuccess === true) {
          if (result.hasLoggedIn === true) {
            localStorage.setItem('expectedRole', result.userRoleName);
            console.log(result.userRoleName)
            localStorage.setItem('UserId', result.userID);
            localStorage.setItem('Token', result.securityToken);
            localStorage.setItem('Name', result.name);

            this.router.navigate(['/home']).then(() => {
              location.reload();
            });
          } else {
            //Redirect to Complete Profile Page
            localStorage.setItem('userAccessType', result.userRoleName);
            localStorage.setItem('UserId', result.userID);
            localStorage.setItem('Token', result.securityToken);
            localStorage.setItem('Name', result.name);
            this.router.navigate(['/UpdateNewUser']);
          }
        } else {
          //Display Error Message
          return;
        }
      });
    }
  }

  openDialog(): void {
    this.dialog.open(LoginComponent);
  }
}
