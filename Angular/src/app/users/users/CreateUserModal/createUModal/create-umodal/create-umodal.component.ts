import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/UserModels/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-umodal',
  templateUrl: './create-umodal.component.html',
  styleUrls: ['./create-umodal.component.scss']
})
export class CreateUserModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  hide = true;

  userModel: User = {
    username: "",
    password : "",
    email : "",
    name : "",
    surname : "",
    phoneNumber : "",
    userID: 0, 
  }

  constructor(
    private dialogRef: MatDialogRef<CreateUserModalComponent>,
    private fb: FormBuilder,
    private userService : UserService,
    private router : Router,
    private snackBar : MatSnackBar,
    ) {  }

  ngOnInit(): void {  }

  CreateTenant() {
    //debugger;
    this.userService.createUser(this.userModel).subscribe(
      (response) => {
        console.log('Tenant created successfully:', response);
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating tenant:', error);
        this.dialogRef.close();
        location.reload();
      }
    );
  }

  /*CreateTenant() {
    this.tenantService.createTenant(this.tenantModel).subscribe(
      (response) => {
        console.log('Tenant created successfully:', response);
        this.dialogRef.close();
        this.showSnackBar('Tenant created successfully', 'success');
        location.reload();
      },
      (error) => {
        console.error('Error creating tenant:', error);
        this.dialogRef.close();
        this.showSnackBar('Error creating tenant: ' + error.message, 'error');
      }
    );
  }

  showSnackBar(message: string, panelClass: string = 'success') {
    const snackBarRef = this.snackBar.open(message, 'X', {
      duration: 50000, 
      panelClass: panelClass,
    });
  
    snackBarRef.afterDismissed().subscribe(() => {
      
    });
  }*/
  
  closeModal() {
    this.dialogRef.close();
  }

  //Username
  username = new FormControl('', [Validators.required]);

  getErrorMessageUsername() {
    if (this.username.hasError('required')) {
      return 'Username required';
    }

    return this.username.hasError('username') ? 'Not a valid username' : '';
  }
  //Password
  password = new FormControl('', [Validators.required]);

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Password required';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }
  //Email
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Email required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  //Name
  name = new FormControl('', [Validators.required]);

  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'Name required';
    }

    return this.email.hasError('name') ? 'Not a valid name' : '';
  }
  //Surname
  surname = new FormControl('', [Validators.required]);

  getErrorMessageSurname() {
    if (this.surname.hasError('required')) {
      return 'Surname required';
    }

    return this.surname.hasError('surname') ? 'Not a valid surname' : '';
  }
  //Phone Number
  phoneNumber = new FormControl('', [Validators.required]);

  getErrorMessagePhoneNumber() {
    if (this.phoneNumber.hasError('required')) {
      return 'Personal phone number required';
    }

    return this.surname.hasError('phoneNumber') ? 'Not a valid personal phone number' : '';
  }
}

/*import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

NgModule({
  imports: [
  import { UserService } from './../../../viewUsers/view-users/user.service';
  BrowserAnimationsModule,
    BrowserModule,
    FormsModule
  ],
})

@Component({
  selector: 'app-create-umodal',
  templateUrl: './create-umodal.component.html',
  styleUrls: ['./create-umodal.component.scss']
})

export class CreateUModalComponent {
  email: string = '';
  userRole: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateUModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeModal() {
    this.dialogRef.close();
  }

  createUser(): void {
    this.dialogRef.close({ email: this.email, userRole: this.userRole });
  }
}*/
