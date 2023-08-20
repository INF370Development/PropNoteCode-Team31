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

}
