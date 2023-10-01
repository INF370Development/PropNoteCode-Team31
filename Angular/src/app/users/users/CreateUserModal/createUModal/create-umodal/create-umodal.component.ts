import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/UserModels/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserModel } from 'src/app/shared/UserModels/CreateUserModel';
import { Role } from '../../../viewUserRoles/view-user-roles/updateUserRoleModal/update-user-role-modal/update-user-role-modal.component';
import { KRole } from 'src/app/shared/UserModels/KRole';


@Component({
  selector: 'app-create-umodal',
  templateUrl: './create-umodal.component.html',
  styleUrls: ['./create-umodal.component.scss'],
})
export class CreateUserModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  userModal: CreateUserModel = {
    Name: '',
    Username: '',
    userRole: '',
    Email: '',
  };

  RoleList: KRole[] = [];
  constructor(
    private dialogRef: MatDialogRef<CreateUserModalComponent>,
    private userService: UserService,
    private router: Router,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getRoles().subscribe((response) => {
      this.RoleList = response;
      console.log('asfedfhgrfsdghfdghfdgh', response);
      console.log('Role List', this.RoleList);
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
  
 //Name
 name = new FormControl('', [Validators.required]);

 getErrorMessageName() {
   if (this.name.hasError('required')) {
     return 'Name required';
   }

   return this.name.hasError('name') ? 'Not a valid name' : '';
 }

 //Username
username = new FormControl('', [Validators.required]);

getErrorMessageUsername() {
  if (this.username.hasError('required')) {
    return 'Username required';
  }

  return this.username.hasError('username') ? 'Not a valid username' : '';
}
//Email
email = new FormControl('', [Validators.required, Validators.email]);

getErrorMessageEmail() {
  if (this.email.hasError('required')) {
    return 'Email required';
  }

  return this.email.hasError('email') ? 'Not a valid email' : '';
}

userRole = new FormControl('', [Validators.required]); // Define FormControl for userRole

CreateNewUser() {
  // Check if any required fields are empty
  if (!this.userModal.Name || !this.userModal.Username || !this.userModal.Email || !this.userModal.userRole) {
    // Display a snackbar message indicating the form is incomplete
    this.snackBar.open('Please fill in all required fields.', '', {
      duration: 3000, // 3 seconds
      panelClass: ['mat-toolbar', 'mat-primary'] // Optional styling classes
    });
    return;
  }

  // If all required fields are filled, proceed to create the user
  this.userService.createNewUser(this.userModal).subscribe(
    (response) => {
      console.log('User created successfully:', response);
      this.dialogRef.close({ success: true, user: this.userModal });
    },
    (error) => {
      console.error('Error creating user:', error);
    }
  );
}

}
