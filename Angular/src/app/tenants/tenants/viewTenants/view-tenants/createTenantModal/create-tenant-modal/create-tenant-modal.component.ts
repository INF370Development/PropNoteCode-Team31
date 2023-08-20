import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TenantService } from 'src/app/services/tenant.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Tenant } from 'src/app/shared/UserModels/Tenant';
import { User } from 'src/app/shared/UserModels/User';
import { UserTenant } from 'src/app/shared/UserModels/UserTenant';

@Component({
  selector: 'app-create-tenant-modal',
  templateUrl: './create-tenant-modal.component.html',
  styleUrls: ['./create-tenant-modal.component.scss']
})

export class CreateTenantModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  hide = true;

  tenantModel: UserTenant = {
    username: "",
    password : "",
    email : "",
    name : "",
    surname : "",
    phoneNumber : "",
    companyName : "",
    companyNumber : "",
    profilePhoto : "",
  }

  constructor(
    private dialogRef: MatDialogRef<CreateTenantModalComponent>,
    private fb: FormBuilder,
    private tenantService : TenantService,
    private userService : UserService,
    private router : Router
    ) {  }

  ngOnInit(): void {  }

  CreateTenant() {
    //debugger;
    this.tenantService.createTenant(this.tenantModel).subscribe(
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
  //Company Name
  companyName = new FormControl('', [Validators.required]);

  getErrorMessageCompanyName() {
    if (this.companyName.hasError('required')) {
      return 'Company name required';
    }

    return this.companyName.hasError('companyName') ? 'Not a valid company name' : '';
  }
  //Company Phone Number
  companyNumber = new FormControl('', [Validators.required]);

  getErrorMessageCompanyNumber() {
    if (this.companyNumber.hasError('required')) {
      return 'Company phone number required';
    }

    return this.companyNumber.hasError('companyNumber') ? 'Not a valid company phone number' : '';
  }
}
