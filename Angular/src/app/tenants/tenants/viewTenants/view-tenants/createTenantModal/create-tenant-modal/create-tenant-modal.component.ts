import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TenantService } from 'src/app/services/tenant.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Tenant } from 'src/app/shared/UserModels/Tenant';
import { User } from 'src/app/shared/UserModels/User';
import { UserTenant } from 'src/app/shared/UserModels/UserTenant';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router : Router,
    private snackBar : MatSnackBar,
    ) {  }

  ngOnInit(): void {  }

  CreateTenant() {
    //debugger;

    // Check if any required fields are empty
if (!this.tenantModel.name || !this.tenantModel.username || !this.tenantModel.email || !this.tenantModel.password ||this.tenantModel.companyName|| this.tenantModel.companyNumber ||this.tenantModel.surname || this.tenantModel.phoneNumber ) {
  // Display a snackbar message indicating the form is incomplete
  this.snackBar.open('Please fill in all required fields.', '', {
    duration: 3000, // 3 seconds
    panelClass: ['mat-toolbar', 'mat-primary'] // Optional styling classes
  });
  return;
}
    
    this.tenantService.createTenant(this.tenantModel).subscribe(
      (response) => {
        console.log('Tenant created successfully:', response);
        this.dialogRef.close();
        this.snackBar.open('Tenant created successfully', 'Close', {
          duration: 9000,
        });

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