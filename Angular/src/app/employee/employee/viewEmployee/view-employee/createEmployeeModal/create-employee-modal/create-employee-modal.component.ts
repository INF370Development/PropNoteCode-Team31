import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/UserModels/Employee';
import { User } from 'src/app/shared/UserModels/User';
import { UserEmployee } from 'src/app/shared/UserModels/UserEmployee';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-employee-modal',
  templateUrl: './create-employee-modal.component.html',
  styleUrls: ['./create-employee-modal.component.scss']
})

export class CreateEmployeeModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  hide = true;

  employeeModel: UserEmployee = {
    username: "",
    password : "",
    email : "",
    name : "",
    surname : "",
    phoneNumber : "",
    jobTitle : "",
    profilePhoto : "",
  }

  constructor(
    private dialogRef: MatDialogRef<CreateEmployeeModalComponent>,
    private fb: FormBuilder,
    private employeeService : EmployeeService,
    private userService : UserService,
    private router : Router,
    private snackBar : MatSnackBar,
    ) {  }

  ngOnInit(): void {  }

  CreateTenant() {
    //debugger;
    this.employeeService.createEmployee(this.employeeModel).subscribe(
      (response) => {
        console.log('Employee created successfully:', response);
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating employee:', error);
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

    return this.name.hasError('name') ? 'Not a valid name' : '';
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
  //Job Title
  jobTitle = new FormControl('', [Validators.required]);

  getErrorMessageJobTitle() {
    if (this.jobTitle.hasError('required')) {
      return 'Job title required';
    }

    return this.jobTitle.hasError('jobTitle') ? 'Not a valid job title' : '';
  }
}