import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrokerService } from 'src/app/services/broker.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Inspection, InspectionStatus, InspectionType } from 'src/app/shared/Property/Inspection';

@Component({
  selector: 'app-update-inspection-modal',
  templateUrl: './update-inspection-modal.component.html',
  styleUrls: ['./update-inspection-modal.component.scss'],
})
export class UpdateInspectionModalComponent implements OnInit {
  inspectionModal: Inspection = new Inspection();
  inspectionStatuses: InspectionStatus[] = [];
  inspectionTypes: InspectionType[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { inspection: Inspection },
    private dialogRef: MatDialogRef<UpdateInspectionModalComponent>,
    private propertyService: PropertiesService,
    private router: Router,
    private brokerService: BrokerService
  ) {}

  ngOnInit(): void {
    this.inspectionModal = { ...this.data.inspection }; // Initialize with existing inspection data

    this.propertyService.getInspectionStatuses().subscribe((inspectionStatuses) => {
      this.inspectionStatuses = inspectionStatuses;

      // Find and set the selected inspectionStatus in inspectionModal
      this.inspectionModal.inspectionStatus = this.inspectionStatuses.find(
        (status) => status.inspectionStatusID === this.inspectionModal.inspectionStatusID
      );

      if (this.inspectionModal?.inspectionStatus) {
        // Now you can safely access this.inspectionModal.inspectionStatus
      }
    });

    this.propertyService.getInspectionTypes().subscribe((inspectionTypes) => {
      this.inspectionTypes = inspectionTypes;

      // Find and set the selected inspectionType in inspectionModal
      this.inspectionModal.inspectionType = this.inspectionTypes.find(
        (type) => type.inspectionTypeID === this.inspectionModal.inspectionTypeID
      );

      if (this.inspectionModal?.inspectionType) {
        // Now you can safely access this.inspectionModal.inspectionType
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  updateInspection() {
    // Send this.inspectionModal to your API for updating
    this.propertyService
      .updateInspection(this.inspectionModal)
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
          console.error('Error updating inspection:', error);
          // Optionally, you can add error handling logic here
        }
      );
  }
  // Implement the rest of your form validation and error messages as needed
}
