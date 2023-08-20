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
  }

  closeModal() {
    this.dialogRef.close();
  }
}
