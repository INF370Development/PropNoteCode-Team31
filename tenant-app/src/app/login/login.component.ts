import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      // Call your authentication service to perform login
      this.authService.Login(formData).subscribe(
        (result: any) => {
          if (result.isSuccess === true) {
            if (result.hasLoggedIn === true) {
              localStorage.setItem('expectedRole', result.userRoleName);
              localStorage.setItem('UserId', result.userID);
              localStorage.setItem('Token', result.securityToken);
              localStorage.setItem('Name', result.name);

              this.router.navigate(['/home']);
            } else {
              // Redirect to Complete Profile Page
              localStorage.setItem('userAccessType', result.userRoleName);
              localStorage.setItem('UserId', result.userID);
              localStorage.setItem('Token', result.securityToken);
              localStorage.setItem('Name', result.name);

              this.router.navigate(['/UpdateNewUser']);
            }
          } else {
            // Display Error Message
          }
        },
        (error) => {
          // Handle login error
        }
      );
    }
  }
}
