import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrokerService } from 'src/app/services/broker.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Recovery, RecoveryType } from 'src/app/shared/Property/Recovery';

@Component({
  selector: 'app-update-recovery-modal',
  templateUrl: './update-recovery-modal.component.html',
  styleUrls: ['./update-recovery-modal.component.scss']
})
export class UpdateRecoveryModalComponent implements OnInit {
  recoveryModal: Recovery = new Recovery();
  recoveryTypes: RecoveryType[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { recovery: Recovery },
    private dialogRef: MatDialogRef<UpdateRecoveryModalComponent>,
    private propertyService: PropertiesService,
    private router: Router,
    private brokerService: BrokerService
  ) {}

  ngOnInit(): void {
    this.recoveryModal = { ...this.data.recovery }; // Initialize with existing inspection data

    this.propertyService.getRecoveryTypes().subscribe((recoveryTypes) => {
      this.recoveryTypes = recoveryTypes;

      // Find and set the selected inspectionType in inspectionModal
      this.recoveryModal.recoveryType = this.recoveryTypes.find(
        (type) => type.recoveryTypeID === this.recoveryModal.recoveryTypeID
      );

      if (this.recoveryModal?.recoveryType) {
        // Now you can safely access this.inspectionModal.inspectionType
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  updateRecovery() {
    // Send this.inspectionModal to your API for updating
    this.propertyService
      .updateRecovery(this.recoveryModal)
      .subscribe(
        (response) => {
          // Handle success response
          // For example, you can close the modal and notify the user
          this.dialogRef.close();
          location.reload();
        },
        (error) => {
          // Handle error response
          // You can display an error message or perform other actions
          console.error('Error updating recovery:', error);
          // Optionally, you can add error handling logic here
        }
      );
  }
  // Implement the rest of your form validation and error messages as needed
}
