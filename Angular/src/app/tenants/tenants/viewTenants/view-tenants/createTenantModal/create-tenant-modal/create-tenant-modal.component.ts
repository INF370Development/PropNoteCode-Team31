import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TenantService } from 'src/app/services/tenant.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Tenant } from 'src/app/shared/Tenant';
import { User } from 'src/app/shared/User';
import { UserTenant } from 'src/app/shared/UserTenant';

@Component({
  selector: 'app-create-tenant-modal',
  templateUrl: './create-tenant-modal.component.html',
  styleUrls: ['./create-tenant-modal.component.scss']
})

export class CreateTenantModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  errorMessages = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    maxlength: 'This field cannot exceed 50 characters.',
    pattern: 'Invalid input. Please check the format.',
  };

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

  tenantForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateTenantModalComponent>,
    private fb: FormBuilder,
    private tenantService : TenantService,
    private userService : UserService,
    private router : Router
    ) {  
      this.tenantForm = this.fb.group({
        username: ['', [Validators.required, Validators.maxLength(50)]],
        password: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.maxLength(50)]],
        surname: ['', [Validators.required, Validators.maxLength(50)]],
        phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]')]],
        companyName: ['', [Validators.required, Validators.maxLength(50)]],
        companyNumber: ['', [Validators.required, Validators.pattern('[0-9]')]],
      });
    }

  ngOnInit(): void {  }

  /*CreateTenant() {
    debugger;
    this.tenantService.createTenant(this.tenantModel).subscribe(
      (response) => {
        console.log('Tenant created successfully:', response);
        // You can optionally close the modal after creating the broker
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating tenant:', error);
        this.dialogRef.close();
        location.reload();
      }
    );
  }*/

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  CreateTenant() {
    debugger;
  
    if (this.tenantForm.valid) {
      this.tenantService.createTenant(this.tenantForm.value).subscribe(
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
    else {
      this.tenantForm.markAllAsTouched();
    }
  }

  /*CreateTenant() {
    debugger;
  
    if (this.tenantForm.valid) {
      this.tenantService.createTenant(this.tenantForm.value).subscribe(
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
    else {
      this.tenantForm.markAllAsTouched();
    }
  }*/

 /*CreateTenant() {
    debugger;

    if (this.tenantForm.valid) {
      this.tenantService.createTenant(this.tenantForm.value).subscribe(
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
  }*/

  closeModal() {
    this.dialogRef.close();
  }
}
