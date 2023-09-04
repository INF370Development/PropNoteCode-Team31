import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TenantService } from 'src/app/services/tenant.service';
import { Tenant } from 'src/app/shared/UserModels/Tenant';

@Component({
  selector: 'app-update-tenant-modal',
  templateUrl: './update-tenant-modal.component.html',
  styleUrls: ['./update-tenant-modal.component.scss']
})

export class UpdateTenantModalComponent implements OnInit {
  tenantData: Tenant = new Tenant();// Initialize tenantData as an Input property
  updateForm: FormGroup = new FormGroup({}); // Initialize updateForm here

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tenant,
    private dialogRef: MatDialogRef<UpdateTenantModalComponent>,
    private tenantService: TenantService
  ) {
    console.log(this.data);
    if (data) {
      this.updateForm = new FormGroup({
        email: new FormControl(data.user?.email || '', [Validators.required, Validators.email]),
        name: new FormControl(data.user?.name || '', [Validators.required]),
        surname: new FormControl(data.user?.surname || '', [Validators.required]),
        phoneNumber: new FormControl(data.user?.phoneNumber || '', [Validators.required]),
        companyName: new FormControl(data.companyName || '', [Validators.required]),
        companyNumber: new FormControl(data.companyNumber || '', [Validators.required])
      });
    } else {
      // If 'data' is not defined or lacks the expected structure, provide default values or handle accordingly.
      // You might want to show an error message or take other appropriate actions.
    }
  }


  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe((updatedData: Tenant) => {
      console.log("Tenant", updatedData);

      if (updatedData) {
        this.tenantData = updatedData; // Update the tenantData
        // Initialize the form with tenantData values
        this.updateForm.patchValue({
          email: this.tenantData.user.email || '',
          name: this.tenantData.user.name || '',
          surname: this.tenantData.user.surname || '',
          phoneNumber: this.tenantData.user.phoneNumber || '',
          companyName: this.tenantData.companyName || '',
          companyNumber: this.tenantData.companyNumber || ''
        });
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  // Function to update the tenant
  updateTenant() {
    if (this.updateForm.valid) {
      // Get the user from the tenant data
      const user = this.tenantData.user;

      // Update the user's properties
      user.email = this.updateForm.value.email;
      user.name = this.updateForm.value.name;
      user.surname = this.updateForm.value.surname;
      user.phoneNumber = this.updateForm.value.phoneNumber;

      // Update the tenant's properties
      this.tenantData.companyName = this.updateForm.value.companyName;
      this.tenantData.companyNumber = this.updateForm.value.companyNumber;

      // Call your tenant service's updateTenantUser method to save the changes
      this.tenantService.updateTenantUser(this.tenantData.tenantID, this.tenantData).subscribe(
        (response) => {
          console.log('Tenant updated successfully:', response);
          this.dialogRef.close(this.tenantData); // Emit the updated tenant data
        },
        (error) => {
          console.error('Error updating tenant:', error);
          this.dialogRef.close(); // Close the modal
        }
      );
    }
  }
}
