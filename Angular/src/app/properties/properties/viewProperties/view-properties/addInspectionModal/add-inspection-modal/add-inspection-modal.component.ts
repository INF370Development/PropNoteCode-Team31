import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertiesService } from 'src/app/services/properties.service';
import { Inspection, InspectionStatus, InspectionType } from 'src/app/shared/Property/Inspection';

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
  inspectionTime: '',
  inspectionStatus: new InspectionStatus(),
  inspectionType: new InspectionType(),
  };
inspectionStatuses: InspectionStatus[] = [];
inspectionTypes: InspectionType[] =[];

selectedInspectionType: InspectionType | 'createNew' = 'createNew';
newInspectionTypeName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { propertyID: number },
    private dialogRef: MatDialogRef<AddInspectionModalComponent>,
    private propertyService: PropertiesService,
  ) {}

  ngOnInit(): void {
    this.propertyService.getInspectionStatuses().subscribe((inspectionStatuses) => {
      this.inspectionStatuses = inspectionStatuses;
      const todoStatus = this.inspectionStatuses.find(status => status.inspectionStatusName === 'To Do');
      if (todoStatus) {
        this.inspectionModal.inspectionStatusID = todoStatus.inspectionStatusID;
      }
    });
  this.propertyService.getInspectionTypes().subscribe((inspectionTypes) => {
    this.inspectionTypes = inspectionTypes;
});
}

addNewInspectionType() {
  if (this.newInspectionTypeName.trim() === '') {
    // Handle empty description if needed
    return;
  }
  const newInspectionType: InspectionType = {
    inspectionTypeID: 0, // Set to 0 or null since the backend will assign an ID
    inspectionTypeName: this.newInspectionTypeName,
  };

  this.propertyService.addInspectionType(newInspectionType).subscribe(
    (response) => {
      console.log('New Inspection Type added successfully:', response);
      // Add the new inspection type to the existing list
      this.inspectionTypes.push(response);
      // Select the newly added inspection type
      this.selectedInspectionType = response;
      // Clear the input field
      this.newInspectionTypeName = '';
    },
    (error) => {
      console.error('Error adding new Inspection Type:', error);
    }
  );
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

    const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (!timePattern.test(this.inspectionModal.inspectionTime)) {
      console.error('Invalid inspection time');
      return false;
    }

    if (!this.inspectionModal.inspectionStatus || isNaN(this.inspectionModal.inspectionStatus.inspectionStatusID)) {
      console.error('Invalid Status');
      return false;
    }

    if (!this.inspectionModal.inspectionType || isNaN(this.inspectionModal.inspectionType.inspectionTypeID)) {
      console.error('Invalid Type');
      return false;
    }
    if (!this.selectedInspectionType || (this.selectedInspectionType === 'createNew' && this.newInspectionTypeName.trim() === '')) {
      console.error('Invalid Type');
      return false;
    }

    if (this.selectedInspectionType === 'createNew') {
      // User selected "Create New," so we need to add the new inspection type first
      if (this.newInspectionTypeName.trim() === '') {
        console.error('New Inspection Type name is empty');
        return false;
      }

      const newInspectionType: InspectionType = {
        inspectionTypeID: 0, // Set to 0 since the backend will assign a valid ID
        inspectionTypeName: this.newInspectionTypeName,
      };

      this.propertyService.addInspectionType(newInspectionType).subscribe(
        (response) => {
          console.log('New Inspection Type added successfully:', response);
          // Add the new Inspection type to the existing list
          this.inspectionTypes.push(response);
          // Select the newly added Inspection type
          this.selectedInspectionType = response;
          // Assign the newly created Inspection type's ID to the InspectionModal
          this.inspectionModal.inspectionTypeID = response.inspectionTypeID;
          // Clear the input field
          this.newInspectionTypeName = '';
          // Now, proceed to add the Inspection with the newly created type
          this.addInspectionWithSelectedType(response);
        },
        (error) => {
          console.error('Error adding new Inspection Type:', error);
        }
      );
    } else {
      // User selected an existing Inspection type, so add the Inspection with the selected type
      this.addInspectionWithSelectedType(this.selectedInspectionType); // Pass the selected Inspection type
    }

    return true;
  }

  private addInspectionWithSelectedType(inspectionType: InspectionType) {
    this.inspectionModal.inspectionType = inspectionType;
    this.propertyService.addInspection(this.data.propertyID, this.inspectionModal).subscribe(
      (response) => {
        console.log('Inspection created successfully:', response);
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating inspection:', error);
      }
    );
  }

  updateSelectedInspectionType(inspectionType: InspectionType | 'createNew') {
    if (inspectionType === 'createNew') {
      // Handle the "Create New" option
      this.inspectionModal.inspectionType = new InspectionType(); // Create a new empty RecoveryType object
      this.inspectionModal.inspectionTypeID = 0; // Set recoveryTypeID to 0 or null if needed
    } else {
      // Handle an existing recovery type
      this.inspectionModal.inspectionType = inspectionType;
      this.inspectionModal.inspectionTypeID = inspectionType.inspectionTypeID;
    }
  }

  updateSelectedInspectionStatus(inspectionStatus: InspectionStatus) {
    this.inspectionModal.inspectionStatus = inspectionStatus;
    this.inspectionModal.inspectionStatusID = inspectionStatus.inspectionStatusID;
  }

  // Send the selected brokerID to the backend
  sendToBackend() {
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
