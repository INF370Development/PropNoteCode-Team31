import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertiesService } from 'src/app/services/properties.service';
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
selectedRecoveryType: RecoveryType | 'createNew' = 'createNew';
newRecoveryTypeDescription: string = ''; // To store the new recovery type description


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { propertyID: number },
    private dialogRef: MatDialogRef<AddRecoveriesModalComponent>,
    private propertyService: PropertiesService,
  ) {}

  ngOnInit(): void {
    this.propertyService.getRecoveryTypes().subscribe((recoveryTypes) => {
      this.recoveryTypes = recoveryTypes;
  });
}

addNewRecoveryType() {
  if (this.newRecoveryTypeDescription.trim() === '') {
    // Handle empty description if needed
    return;
  }

  const newRecoveryType: RecoveryType = {
    recoveryTypeID: 0, // Set to 0 or null since the backend will assign an ID
    recoveryTypeDescription: this.newRecoveryTypeDescription,
  };

  this.propertyService.addRecoveryType(newRecoveryType).subscribe(
    (response) => {
      console.log('New Recovery Type added successfully:', response);
      // Add the new recovery type to the existing list
      this.recoveryTypes.push(response);
      // Select the newly added recovery type
      this.selectedRecoveryType = response;
      // Clear the input field
      this.newRecoveryTypeDescription = '';
    },
    (error) => {
      console.error('Error adding new Recovery Type:', error);
    }
  );
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

    if (!this.recoveryModal.recoveryType || isNaN(this.recoveryModal.recoveryType.recoveryTypeID)) {
      console.error('Invalid Type');
      return false;
    }

    if (!this.selectedRecoveryType || (this.selectedRecoveryType === 'createNew' && this.newRecoveryTypeDescription.trim() === '')) {
      console.error('Invalid Type');
      return false;
    }

    if (this.selectedRecoveryType === 'createNew') {
      // User selected "Create New," so we need to add the new recovery type first
      if (this.newRecoveryTypeDescription.trim() === '') {
        console.error('New Recovery Type description is empty');
        return false;
      }

      const newRecoveryType: RecoveryType = {
        recoveryTypeID: 0, // Set to 0 since the backend will assign a valid ID
        recoveryTypeDescription: this.newRecoveryTypeDescription,
      };

      this.propertyService.addRecoveryType(newRecoveryType).subscribe(
        (response) => {
          console.log('New Recovery Type added successfully:', response);
          // Add the new recovery type to the existing list
          this.recoveryTypes.push(response);
          // Select the newly added recovery type
          this.selectedRecoveryType = response;
          // Assign the newly created recovery type's ID to the recoveryModal
          this.recoveryModal.recoveryTypeID = response.recoveryTypeID;
          // Clear the input field
          this.newRecoveryTypeDescription = '';
          // Now, proceed to add the recovery with the newly created type
          this.addRecoveryWithSelectedType(response);
        },
        (error) => {
          console.error('Error adding new Recovery Type:', error);
        }
      );
    } else {
      // User selected an existing recovery type, so add the recovery with the selected type
      this.addRecoveryWithSelectedType(this.selectedRecoveryType); // Pass the selected recovery type
    }

    return true;
  }

  private addRecoveryWithSelectedType(recoveryType: RecoveryType) {
    this.recoveryModal.recoveryType = recoveryType;
    this.propertyService.AddRecovery(this.data.propertyID, this.recoveryModal).subscribe(
      (response) => {
        console.log('Recovery created successfully:', response);
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating recovery:', error);
      }
    );
  }

  updateSelectedRecoveryType(recoveryType: RecoveryType | 'createNew') {
    if (recoveryType === 'createNew') {
      // Handle the "Create New" option
      this.recoveryModal.recoveryType = new RecoveryType(); // Create a new empty RecoveryType object
      this.recoveryModal.recoveryTypeID = 0; // Set recoveryTypeID to 0 or null if needed
    } else {
      // Handle an existing recovery type
      this.recoveryModal.recoveryType = recoveryType;
      this.recoveryModal.recoveryTypeID = recoveryType.recoveryTypeID;
    }
  }


  sendToBackend() {
  //  debugger;
    if (this.recoveryModal.recoveryType) {
      const recoveryTypeID = this.recoveryModal.recoveryType.recoveryTypeID;
      console.log("RecoveryTypeID", recoveryTypeID)
    }
  }

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
