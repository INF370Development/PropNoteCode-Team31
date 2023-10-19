import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractorService } from 'src/app/services/contractor.service';
import { Contractor } from 'src/app/shared/UserModels/Contractor';
import { ContractorType } from 'src/app/shared/UserModels/ContractorType';
import { ContractorTypeService } from 'src/app/services/contractorType.service';

@Component({
  selector: 'app-update-contractor-modal',
  templateUrl: './update-contractor-modal.component.html',
  styleUrls: ['./update-contractor-modal.component.scss']
})
export class UpdateContractorModalComponent implements OnInit {
  contractorData: Contractor = new Contractor();// Initialize tenantData as an Input property
  updateForm: FormGroup = new FormGroup({}); // Initialize updateForm here

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Contractor,
    private dialogRef: MatDialogRef<UpdateContractorModalComponent>,
    private contractorService: ContractorService
  ) {
    console.log(this.data);
    if (data) {
      this.updateForm = new FormGroup({
        email: new FormControl(data.user?.email || '', [Validators.required, Validators.email]),
        name: new FormControl(data.user?.name || '', [Validators.required]),
        surname: new FormControl(data.user?.surname || '', [Validators.required]),
        phoneNumber: new FormControl(data.user?.phoneNumber || '', [Validators.required]),
        areaOfBusiness: new FormControl(data.areaOfBusiness || '', [Validators.required]),
        availability: new FormControl(data.availability || '', [Validators.required])
      });
    } else {
      // If 'data' is not defined or lacks the expected structure, provide default values or handle accordingly.
      // You might want to show an error message or take other appropriate actions.
    }
  }


  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe((updatedData: Contractor) => {
      console.log("Contractor", updatedData);

      if (updatedData) {
        this.contractorData = updatedData; // Update the tenantData
        // Initialize the form with tenantData values
        this.updateForm.patchValue({
          email: this.contractorData.user.email || '',
          name: this.contractorData.user.name || '',
          surname: this.contractorData.user.surname || '',
          phoneNumber: this.contractorData.user.phoneNumber || '',
          companyName: this.contractorData.areaOfBusiness || '',
          companyNumber: this.contractorData.availability || ''
        });
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  // Function to update the tenant
  updateContractor() {
    if (this.updateForm.valid) {
      // Get the user from the tenant data
      const user = this.contractorData.user;

      // Update the user's properties
      user.email = this.updateForm.value.email;
      user.name = this.updateForm.value.name;
      user.surname = this.updateForm.value.surname;
      user.phoneNumber = this.updateForm.value.phoneNumber;

      // Update the tenant's properties
      this.contractorData.areaOfBusiness = this.updateForm.value.areaOfBusiness;
      this.contractorData.availability = this.updateForm.value.availability;

      // Call your tenant service's updateTenantUser method to save the changes
      this.contractorService.updateContractorUser(this.contractorData.contractorID, this.contractorData).subscribe(
        (response) => {
          console.log('Contractor updated successfully:', response);
          this.dialogRef.close(this.contractorData); // Emit the updated tenant data
        },
        (error) => {
          console.error('Error updating contractor:', error);
          this.dialogRef.close(); // Close the modal
        }
      );
    }
  }
}
  /*adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  hide = true;

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

  contractorForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateContractorModalComponent>,
    private fb: FormBuilder,
    private contractorService : ContractorService,
    private userService : UserService,
    private router: Router,
    private contractorTypeService: ContractorTypeService,
    private snackBar : MatSnackBar,
  ) {  }

  ngOnInit(): void {
    this.contractorTypeService.getContractorTypes().subscribe((contractorTypes) => {
      this.contractorTypes = contractorTypes;
      console.log('Contractor Types:', this.contractorTypes);
  });
}

  createRole() {
    this.dialogRef.close();
  }

  CreateContractor() {
    this.contractorService.createContractor(this.contractorModel).subscribe(
      (response) => {
        console.log('Tenant created successfully:', response);
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

  updateSelectedContractorType(contractorType: ContractorType) {
    this.contractorModel.contractorType = contractorType;
    this.contractorModel.contractorTypeID = contractorType.contractorTypeID;
    console.log('Updated Contractor Type:', this.contractorModel.contractorType);
  }

  sendToBackend() {
    if (this.contractorModel.contractorType) {
      const contractorTypeID = this.contractorModel.contractorType.contractorTypeID;
      console.log("contractorTypeID", contractorTypeID);
      this.closeModal;
    }
}

  //Username
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

    return this.email.hasError('name') ? 'Not a valid name' : '';
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
}*/
