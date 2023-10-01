import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/UserModels/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-update-profile-details',
  templateUrl: './update-profile-details.component.html',
  styleUrls: ['./update-profile-details.component.scss'],
})
export class UpdateProfileDetailsComponent implements OnInit {
  UserId: number = parseInt(localStorage.getItem('UserId') || '0', 10);
  userModal: User = {
    name: '',
    username: '',
    userID: this.UserId,
    email: '',
    password: '',
    phoneNumber: '',
    surname: '',
    hasLoggedIn: true,
    profilePhoto: '',
  };
  UserDetails: User = new User();
  constructor(
    private AuthServiceEndPoints: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.LoadUserInfo();
  }
  UpdateUserDetails() {
    this.AuthServiceEndPoints.UpdateNewUser(this.userModal).subscribe((res) => {
      if (res.userID == this.UserId) {
        this.router.navigate(['/home']).then(window.location.reload);
      }
    });
  }
  LoadUserInfo() {
    this.userService.getUserInformation(this.UserId).subscribe((response) => {
      this.userModal.name = response.name;
      this.userModal.surname = response.surname;
      this.userModal.phoneNumber = response.phoneNumber;
      this.userModal.username = response.username;
      this.userModal.email = response.email;
    });
  }
}
