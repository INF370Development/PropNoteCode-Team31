import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrokerService } from 'src/app/services/broker.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Broker } from 'src/app/shared/Broker';
import { Inspection, InspectionStatus, InspectionType } from 'src/app/shared/Property/Inspection';
import { Property } from 'src/app/shared/Property/Property';
import { Recovery } from 'src/app/shared/Property/Recovery';

@Component({
  selector: 'app-add-inspection-modal',
  templateUrl: './add-inspection-modal.component.html',
  styleUrls: ['./add-inspection-modal.component.scss'],
})
export class AddInspectionModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  inspectionModal: Inspection = {
  inspectionID: 0,
  inspectionTypeID: 0,
  propertyID: 0,
  inspectionStatusID: 0,
  inspectionDescription: "",
  inspectionDate: new Date(),
  inspectionTime: '', // You can use string for TimeSpan representation
  inspectionStatus: new InspectionStatus(),
  inspectionType: new InspectionType(),
  };
inspectionStatuses: InspectionStatus[] = [];
inspectionTypes: InspectionType[] =[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { propertyID: number },
    private dialogRef: MatDialogRef<AddInspectionModalComponent>,
    private propertyService: PropertiesService,
    private router: Router,
    private brokerService: BrokerService,
    private datePipe : DatePipe
  ) {}

  ngOnInit(): void {
    this.propertyService.getInspectionStatuses().subscribe((inspectionStatuses) => {
      this.inspectionStatuses = inspectionStatuses;
  });
  this.propertyService.getInspectionTypes().subscribe((inspectionTypes) => {
    this.inspectionTypes = inspectionTypes;
});
}

  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
  AddInspection() {
    const validationErrors: any[] = [];

    if (this.inspectionModal.inspectionDescription.length > 100) {
      console.error('Description is too long');
      return false;
    }

    // debugger;
    // if (!(this.inspectionModal.inspectionDate instanceof Date)) {
    //   console.error('Invalid inspection date');
    //   return false;
    // }



    const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (!timePattern.test(this.inspectionModal.inspectionTime)) {
      console.error('Invalid inspection time');
      return false;
    }


    //
    if (!this.inspectionModal.inspectionStatus || isNaN(this.inspectionModal.inspectionStatus.inspectionStatusID)) {
      console.error('Invalid Status');
      return false;
    }

    if (!this.inspectionModal.inspectionType || isNaN(this.inspectionModal.inspectionType.inspectionTypeID)) {
      console.error('Invalid Type');
      return false;
    }

  if (validationErrors.length > 0) {
    const errorMessage = validationErrors.join('\n');
    alert('Validation errors:\n' + errorMessage);
    return false;
  }

  this.propertyService.addInspection(this.data.propertyID, this.inspectionModal).subscribe(
    (response) => {
      console.log('Inspection created successfully:', response);
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

  updateSelectedInspectionType(inspectionType: InspectionType) {
    this.inspectionModal.inspectionType = inspectionType;
    this.inspectionModal.inspectionTypeID = inspectionType.inspectionTypeID;
  }

  updateSelectedInspectionStatus(inspectionStatus: InspectionStatus) {
    this.inspectionModal.inspectionStatus = inspectionStatus;
    this.inspectionModal.inspectionStatusID = inspectionStatus.inspectionStatusID;
  }

  // Send the selected brokerID to the backend
  sendToBackend() {
  //  debugger;
    if (this.inspectionModal.inspectionType) {
      const inspectionTypeID = this.inspectionModal.inspectionType.inspectionTypeID;
      console.log("InspectionTypeID", inspectionTypeID)
    }
    if (this.inspectionModal.inspectionStatus) {
      const inspectionStatusID = this.inspectionModal.inspectionStatus.inspectionStatusID;
      console.log("InspectionStatusID", inspectionStatusID)
    }
    console.log("Date", this.inspectionDate)

  }


  //Description
  inspectionDescription = new FormControl('', [Validators.required]);

  getErrorMessageDescription() {
    if (this.inspectionDescription.hasError('required')) {
      return 'Description required';
    }

    return this.inspectionDescription.hasError('description') ? 'Not a valid description' : '';
  }

  inspectionDate = new FormControl('', [Validators.required]);

  getErrorMessageDate() {
    if (this.inspectionDate.hasError('required')) {
      return 'Date required';
    }

    return this.inspectionDate.invalid ? 'Not a valid Date' : '';
  }

  inspectionTime = new FormControl('', [Validators.required]);

  getErrorMessageTime() {
    if (this.inspectionTime.hasError('required')) {
      return 'Time required';
    }

    const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    if (!timePattern.test(this.inspectionModal.inspectionTime)) {
      return 'Invalid time format';
    }

    return '';
  }


}
