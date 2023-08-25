import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContractorService } from 'src/app/services/contractor.service';
import { UserService } from 'src/app/services/user.service';
import { ContractorTypeService } from 'src/app/services/contractorType.service';
import { ContractorType } from 'src/app/shared/UserModels/ContractorType';
import { UserContractor } from 'src/app/shared/UserModels/UserContractor';
import { Contractor } from 'src/app/shared/UserModels/Contractor';
import { User } from 'src/app/shared/UserModels/User';
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
    private dialogRef: MatDialogRef<CreateContractorModalComponent>,
    private fb: FormBuilder,
    private contractorService : ContractorService,
    private userService : UserService,
    private router: Router,
    private contractorTypeService: ContractorTypeService,
    private snackBar : MatSnackBar,
  ) {
    this.contractorForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      areaOfBusiness: ['', Validators.required],
      availability: ['', Validators.required],
    });
  }

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
    if (this.contractorForm.valid) {
      this.contractorService.createContractor(this.contractorModel).subscribe(
        (response) => {
          console.log('Contractor created successfully:', response);
          this.snackBar.open('Contractor added successfully', 'Close', {
            duration: 2000,
          });
        },
        (error) => {
          console.error('Error creating Contractor:', error);
          this.snackBar.open('Error creating contractor', 'Close', {
            duration: 2000,
          }).afterDismissed().subscribe(() => {
            this.closeModal;
          });
        }
      );
    }
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
}


 /* CreateContractor() {
    //debugger;
    this.contractorService.createContractor(this.contractorModel).subscribe(
      (response) => {
        console.log('Contractor created successfully:', response);
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating Contractor:', error);
        this.dialogRef.close();
        location.reload();
      }
    );
  }*/

  /*CreateContractor() {
    this.contractorService.createContractor(this.contractorModel).subscribe(
        (response) => {
            console.log('Contractor created successfully:', response);
            this.dialogRef.close();
              location.reload();
            this.snackBar.open('Contractor added successfully', 'Close', {
                duration: 5000, 
            });
        },
        (error) => {
            console.error('Error creating Contractor:', error);
            this.dialogRef.close();
            this.snackBar.open('Error creating contractor', 'Close', {
                duration: 5000, 
            });
        }
    );
  }*/

   /*CreateContractor() {
    this.contractorService.createContractor(this.contractorModel).subscribe(
        (response) => {
            console.log('Contractor created successfully:', response);
            this.snackBar.open('Contractor added successfully', 'Close', {
                duration: 2000, // Adjust the duration as needed
            })
        },
        (error) => {
            console.error('Error creating Contractor:', error);
            this.snackBar.open('Error creating contractor', 'Close', {
                duration: 2000, // Adjust the duration as needed
            }).afterDismissed().subscribe(() => {
                this.dialogRef.close();
            });
        }
    );
  }*/