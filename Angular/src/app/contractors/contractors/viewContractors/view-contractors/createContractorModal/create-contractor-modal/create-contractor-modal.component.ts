import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractorTypeService } from 'src/app/services/contractorType.service';
import { ContractorType } from 'src/app/shared/UserModels/ContractorType';
import { UserContractor } from 'src/app/shared/UserModels/UserContractor';

@Component({
  selector: 'app-create-contractor-modal',
  templateUrl: './create-contractor-modal.component.html',
  styleUrls: ['./create-contractor-modal.component.scss'],
})
export class CreateContractorModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

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

  constructor(
    private dialogRef: MatDialogRef<CreateContractorModalComponent>,
    private contractorService : ContractorService,
    private router: Router,
    private contractorTypeService: ContractorTypeService
  ) {}

  ngOnInit(): void {
    this.contractorTypeService.getContractorTypes().subscribe((contractorTypes) => {
      this.contractorTypes = contractorTypes;
  });
}

  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
  CreateContractor() {
    this.contractorService.createContractor(this.contractorModel).subscribe(
      (response) => {
        console.log('Contractor created successfully:', response);
        // You can optionally close the modal after creating the broker
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating contractor:', error);
      }
    );
  }

  updateSelectedContractorType(contractorType: ContractorType) {
    this.contractorModel.contractorType = contractorType;
    this.contractorModel.contractorTypeID = contractorType.contractorTypeID;
  }

  // Send the selected brokerID to the backend
  sendToBackend() {
  //  debugger;
    if (this.contractorModel.contractorType) {
      const contractorTypeID = this.contractorModel.contractorType.contractorTypeID;
      console.log("contractorTypeID", contractorTypeID)
    }

  }

  hide = true;
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
}
