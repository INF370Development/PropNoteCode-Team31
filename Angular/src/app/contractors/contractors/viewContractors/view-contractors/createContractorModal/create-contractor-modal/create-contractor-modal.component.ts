import { Component, OnInit  } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractorTypeService } from 'src/app/services/contractorType.service';
import { ContractorType } from 'src/app/shared/UserModels/ContractorType';
import { UserContractor } from 'src/app/shared/UserModels/UserContractor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-contractor-modal',
  templateUrl: './create-contractor-modal.component.html',
  styleUrls: ['./create-contractor-modal.component.scss'],
})

export class CreateContractorModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;
  hide: boolean = true;

  contractorModel: UserContractor = {
  username: "",
  password : "",
  email : "",
  name : "",
  surname : "",
  phoneNumber : "",
  areaOfBusiness : "",
  availability : "",
  profilePhoto : "",
  contractorTypeID : 0,
  contractorType : new ContractorType(),
  };

  contractorTypes: ContractorType[] = [];
  selectedContractorType: ContractorType | 'createNew' = 'createNew';
  newContractorTypeName: string = '';

  constructor(
    private dialogRef: MatDialogRef<CreateContractorModalComponent>,
    private contractorService : ContractorService,
    private contractorTypeService: ContractorTypeService,
    private snackBar : MatSnackBar,
  ) {  }

  ngOnInit(): void {
    this.contractorTypeService.getContractorTypes().subscribe((contractorTypes) => {
      this.contractorTypes = contractorTypes;
  });
}

addNewContractorType() {
  if (this.newContractorTypeName.trim() === '') {
    // Handle empty description if needed
    return;
  }
  const newContractorType: ContractorType = {
    contractorTypeID: 0, // Set to 0 or null since the backend will assign an ID
    contractorTypeName: this.newContractorTypeName,
  };

  this.contractorTypeService.createContractorType(newContractorType).subscribe(
    (response) => {
      console.log('New Contractor Type added successfully:', response);
      // Add the new inspection type to the existing list
      this.contractorTypes.push(response);
      // Select the newly added inspection type
      this.selectedContractorType = response;
      // Clear the input field
      this.newContractorTypeName = '';
    },
    (error) => {
      console.error('Error adding new Inspection Type:', error);
    }
  );
}

  CreateContractor() {
    debugger;

    if (this.selectedContractorType === 'createNew') {
      // User selected "Create New," so we need to add the new recovery type first
      if (this.newContractorTypeName.trim() === '') {
        console.error('New Contractor Type description is empty');
        return false;
      }

      const newContractorType: ContractorType = {
        contractorTypeID: 0, // Set to 0 since the backend will assign a valid ID
        contractorTypeName: this.newContractorTypeName,
      };

      debugger;
      this.contractorTypeService.createContractorType(newContractorType).subscribe(
        (response) => {
          console.log('New Recovery Type added successfully:', response);
          // Add the new recovery type to the existing list
          this.contractorTypes.push(response);
          // Select the newly added recovery type
          this.selectedContractorType = response;
          // Assign the newly created recovery type's ID to the recoveryModal
          this.contractorModel.contractorTypeID = response.contractorTypeID;
          // Clear the input field
          this.newContractorTypeName = '';
          // Now, proceed to add the recovery with the newly created type
          this.addContractorWithSelectedType(response);
        },
        (error) => {
          console.error('Error adding new Contractor Type:', error);
        }
      );
    } else {
      // User selected an existing recovery type, so add the recovery with the selected type
      this.addContractorWithSelectedType(this.selectedContractorType); // Pass the selected recovery type
    }

    return true;
  }

  private addContractorWithSelectedType(contractorType: ContractorType) {
    this.contractorModel.contractorType = contractorType;
    this.contractorService.createContractor(this.contractorModel).subscribe(
      (response) => {
        console.log('Contractor created successfully:', response);
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating contractor:', error);
      }
    );
  }

  updateSelectedContractorType(contractorType: ContractorType | 'createNew') {
    if (contractorType === 'createNew') {
      // Handle the "Create New" option
      this.contractorModel.contractorType = new ContractorType(); // Create a new empty RecoveryType object
      this.contractorModel.contractorTypeID = 0; // Set recoveryTypeID to 0 or null if needed
    } else {
      // Handle an existing recovery type
      this.contractorModel.contractorType = contractorType;
      this.contractorModel.contractorTypeID = contractorType.contractorTypeID;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  sendToBackend() {
    if (this.contractorModel.contractorType) {
      const contractorTypeID = this.contractorModel.contractorType.contractorTypeID;
      console.log("contractorTypeID", contractorTypeID);
      this.closeModal;

      this.snackBar.open('Contractor created successfully', 'Close', {
        duration: 9000,
      });

    }
}

  username = new FormControl('', [Validators.required]);

  getErrorMessageUsername() {
    if (this.username.hasError('required')) {
      return 'Username required';
    }

    return this.username.hasError('username') ? 'Not a valid username' : '';
  }
  //Password
  password = new FormControl('', [Validators.required]);

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Password required';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }
  //Email
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Email required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  //Name
  name = new FormControl('', [Validators.required]);

  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'Name required';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }
  //Surname
  surname = new FormControl('', [Validators.required]);

  getErrorMessageSurname() {
    if (this.surname.hasError('required')) {
      return 'Surname required';
    }

    return this.surname.hasError('surname') ? 'Not a valid surname' : '';
  }
  //Phone Number
  phoneNumber = new FormControl('', [Validators.required]);

  getErrorMessagePhoneNumber() {
    if (this.phoneNumber.hasError('required')) {
      return 'Personal phone number required';
    }

    return this.surname.hasError('phoneNumber') ? 'Not a valid personal phone number' : '';
  }
  //Area of Business
  areaBusiness = new FormControl('', [Validators.required]);

  getErrorMessageAreaBusiness() {
    if (this.areaBusiness.hasError('required')) {
      return 'Area of Business required';
    }

    return this.areaBusiness.hasError('areaBusiness') ? 'Not a valid area of business' : '';
  }
  //Availability
  availability = new FormControl('', [Validators.required]);

  getErrorMessageAvailability() {
    if (this.availability.hasError('required')) {
      return 'Availibility required';
    }

    return this.availability.hasError('availability') ? 'Not a valid availability' : '';
  }
}
