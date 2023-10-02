// assign-maintenance-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Angular Forms module
import { Maintenance } from 'src/app/shared/Maintenance';
import { Contractor } from 'src/app/shared/UserModels/Contractor';
import { ContractorService } from 'src/app/services/contractor.service';
import { MaintenanceType } from 'src/app/shared/MaintenanceType';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.scss'],
})
export class AssignDialogComponent implements OnInit {
  maintenanceForm: FormGroup;
  contractors: Contractor[] = [];
  maintenanceTypes: MaintenanceType[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { request: Maintenance },
    private contractorService : ContractorService,
    private maintenanceService : MaintenanceService
  ) {
    // Create and configure the form
    this.maintenanceForm = this.fb.group({
      // Define form controls for additional information
      contractor: [null, Validators.required],
      maintenanceDate: [null, Validators.required],
      maintenanceTime: [''],
      maintenanceType: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Fetch contractors from your data source and populate the 'contractors' array.
    // Example:
    this.contractorService.getContractors().subscribe((data) => {
      this.contractors = data;
    });
    this.maintenanceService.getMaintenanceTypes().subscribe((data) => {
      this.maintenanceTypes = data;
    });
  }

  assignMaintenance(): void {
    console.log('Assign button clicked');
    console.log('Form status:', this.maintenanceForm.status);
    if (this.maintenanceForm.valid) {
      console.log('Form is valid');

      // Get selected contractor ID and maintenance type ID
      const selectedContractorID = this.maintenanceForm.value.contractor;
      const selectedMaintenanceTypeID = this.maintenanceForm.value.maintenanceType;

      const updatedMaintenance: Maintenance = {
        ...this.data.request,
        contractorID: selectedContractorID,
        maintenanceDate: this.maintenanceForm.value.maintenanceDate,
        maintenanceTime: this.maintenanceForm.value.maintenanceTime,
        maintenanceTypeID: selectedMaintenanceTypeID,
      };

      this.maintenanceService.updateMaintenance(updatedMaintenance).subscribe(
        (result) => {
          console.log('Update result:', result);

          if (result) {
            this.dialogRef.close('Maintenance assigned successfully');
          } else {
            console.error('Maintenance update failed');
            // Handle the case where the update was not successful
          }
        },
        (error) => {
          console.error('Error updating maintenance', error);
          // Handle the error here, e.g., display an error message to the user
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }


  // Close the dialog when the "Cancel" button is clicked
  cancel(): void {
    this.dialogRef.close();
  }
}
