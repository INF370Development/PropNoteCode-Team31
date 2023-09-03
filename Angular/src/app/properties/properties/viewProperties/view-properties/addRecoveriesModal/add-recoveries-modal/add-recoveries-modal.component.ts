import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrokerService } from 'src/app/services/broker.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Broker } from 'src/app/shared/Broker';
import { Inspection, InspectionStatus, InspectionType } from 'src/app/shared/Property/Inspection';
import { Property } from 'src/app/shared/Property/Property';
import { Recovery, RecoveryType } from 'src/app/shared/Property/Recovery';

@Component({
  selector: 'app-add-recoveries-modal',
  templateUrl: './add-recoveries-modal.component.html',
  styleUrls: ['./add-recoveries-modal.component.scss'],
})
export class AddRecoveriesModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  recoveryModal: Recovery = {
  recoveryID: 0,
  recoveryTypeID: 0,
  propertyID: 0,
  recoveryDescription: "",
  recoveryAmount: 0,
  recoveryType: new RecoveryType(),
  };
recoveryTypes: RecoveryType[] =[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { propertyID: number },
    private dialogRef: MatDialogRef<AddRecoveriesModalComponent>,
    private propertyService: PropertiesService,
    private router: Router,
    private brokerService: BrokerService
  ) {}

  ngOnInit(): void {
    this.propertyService.getRecoveryTypes().subscribe((recoveryTypes) => {
      this.recoveryTypes = recoveryTypes;
  });
}

  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
  AddRecovery() {
    const validationErrors: any[] = [];

    if (this.recoveryModal.recoveryDescription.length > 100) {
      console.error('Description is too long');
      return false;
    }

    if (isNaN(this.recoveryModal.recoveryAmount)) {
      validationErrors.push('Invalid amount');
    }

    //
    if (!this.recoveryModal.recoveryType || isNaN(this.recoveryModal.recoveryType.recoveryTypeID)) {
      console.error('Invalid Type');
      return false;
    }

  if (validationErrors.length > 0) {
    const errorMessage = validationErrors.join('\n');
    alert('Validation errors:\n' + errorMessage);
    return false;
  }
debugger;
  this.propertyService.AddRecovery(this.data.propertyID, this.recoveryModal).subscribe(
    (response) => {
      console.log('Recovery created successfully:', response);
      // You can optionally close the modal after creating the inspection
      this.dialogRef.close();
      location.reload();
    },
    (error) => {
      console.error('Error creating inspection:', error);
    }
  );

  // Return true to indicate successful execution
  return true;
}

  updateSelectedRecoveryType(recoveryType: RecoveryType) {
    this.recoveryModal.recoveryType = recoveryType;
    this.recoveryModal.recoveryTypeID = recoveryType.recoveryTypeID;
  }


  // Send the selected brokerID to the backend
  sendToBackend() {
  //  debugger;
    if (this.recoveryModal.recoveryType) {
      const recoveryTypeID = this.recoveryModal.recoveryType.recoveryTypeID;
      console.log("InspectionTypeID", recoveryTypeID)
    }

  }


  //Description
  recoveryDescription = new FormControl('', [Validators.required]);

  getErrorMessageDescription() {
    if (this.recoveryDescription.hasError('required')) {
      return 'Description required';
    }

    return this.recoveryDescription.hasError('description') ? 'Not a valid description' : '';
  }

  recoveryAmount = new FormControl('', [Validators.required]);

  getErrorMessageAmount() {
    if (this.recoveryAmount.hasError('required')) {
      return 'Amount required';
    }

    return this.recoveryAmount.invalid ? 'Not a valid amount' : '';
  }



}
